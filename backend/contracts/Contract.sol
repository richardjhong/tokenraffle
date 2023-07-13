// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract NFTRaffleContract is VRFConsumerBaseV2 {
    // Contract variables
    address public owner;
    mapping(address => uint256) public entryCount;
    address[] public players;
    address[] playerSelector;
    bool public raffleStatus;
    uint256 public entryCost;
    address public nftAddress;
    uint256 public nftId;
    uint256 public totalEntries;

    // VRF variables
    struct RequestStatus {
        bool fulfilled;
        bool exists;
        uint256[] randomWords;
    }

    mapping(uint256 => RequestStatus) public s_requests;
    VRFCoordinatorV2Interface COORDINATOR;

    uint64 s_subscriptionId;

    uint256[] public requestIds;
    uint256 public lastRequestId;

    bytes32 keyHash = 0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c; // Sepolia gwei key hash
    uint32 callbackGasLimit = 100000;
    uint16 requestConfirmations = 3;
    uint32 numWords = 2;

    // Contract events
    event NewEntry(address player);
    event RaffleStarted();
    event RaffleEnded();
    event WinnerSelected(address winner);
    event EntryCostChanged(uint256 newCost);
    event NFTPrizeSet(address nftAddress, uint256 nftId);
    event BalanceWithdrawn(uint256 amount);

    // VRF events
    event RequestSent(uint256 requestId, uint32 numWords);
    event RequestFulfilled(uint256 requestId, uint256[] randomWords);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    /**
     * HARDCODED FOR SEPOLIA
     * COORDINATOR: 0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625
     */
    constructor(
        uint256 _entryCost,
        uint64 subscriptionId
    ) VRFConsumerBaseV2(0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625) {
        COORDINATOR = VRFCoordinatorV2Interface(0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625);
        owner = msg.sender;
        entryCost = _entryCost;
        s_subscriptionId = subscriptionId;
    }

    function startRaffle(address _nftContract, uint256 _tokenID) public onlyOwner {
        require(!raffleStatus, "Raffle has already started");
        require(
            nftAddress == address(0),
            "NFT prize already set; Please select winner from previous raffle"
        );
        require(
            ERC721Base(_nftContract).ownerOf(_tokenID) == address(this),
            "Contract does not own NFT"
        );

        nftAddress = _nftContract;
        nftId = _tokenID;
        raffleStatus = true;
        emit RaffleStarted();
        emit NFTPrizeSet(_nftContract, _tokenID);
    }

    function buyEntry(uint256 _numberOfEntries) public payable {
        require(raffleStatus, "Raffle has not started");
        require(msg.value == entryCost * _numberOfEntries, "Incorrect amount sent");

        entryCount[msg.sender] += _numberOfEntries;
        totalEntries += _numberOfEntries;

        if (!isPlayer(msg.sender)) players.push(msg.sender);

        for (uint256 i = 0; i < _numberOfEntries; i++) {
            playerSelector.push(msg.sender);
        }

        emit NewEntry(msg.sender);
    }

    function isPlayer(address _player) public view returns (bool) {
        for (uint256 i = 0; i < players.length; i++) {
            if (players[i] == _player) return true;
        }
        return false;
    }

    function endRaffle() public onlyOwner {
        require(raffleStatus, "Raffle has not started");

        raffleStatus = false;
        emit RaffleEnded();
    }

    function selectWinner() public onlyOwner {
        require(!raffleStatus, "Raffle is still ongoing");
        require(playerSelector.length > 0, "No players in raffle");
        require(nftAddress != address(0), "NFT prize has not been set yet");
        require(s_requests[lastRequestId].exists, "No VRF request has been made yet");
        require(s_requests[lastRequestId].fulfilled = true, "lastRequest is still not fulfilled");

        RequestStatus memory request = s_requests[lastRequestId];

        uint256 winnerIndex = request.randomWords[request.randomWords.length - 1] %
            playerSelector.length;
        address winner = playerSelector[winnerIndex];
        emit WinnerSelected(winner);

        ERC721Base(nftAddress).transferFrom(owner, winner, nftId);
        resetContract();
    }

    function requestRandomWords() external onlyOwner returns (uint256 requestId) {
        requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
        s_requests[requestId] = RequestStatus({
            randomWords: new uint256[](0),
            exists: true,
            fulfilled: false
        });
        requestIds.push(requestId);
        lastRequestId = requestId;
        emit RequestSent(requestId, numWords);
        return requestId;
    }

    function fulfillRandomWords(
        uint256 _requestId,
        uint256[] memory _randomWords
    ) internal override {
        require(s_requests[_requestId].exists, "request not found");
        s_requests[_requestId].fulfilled = true;
        s_requests[_requestId].randomWords = _randomWords;
        emit RequestFulfilled(_requestId, _randomWords);
    }

    function getRequestStatus(
        uint256 _requestId
    ) external view returns (bool fulfilled, uint256[] memory randomWords) {
        require(s_requests[_requestId].exists, "request not found");
        RequestStatus memory request = s_requests[_requestId];
        return (request.fulfilled, request.randomWords);
    }

    function resetEntryCounts() private {
        for (uint256 i = 0; i < players.length; i++) entryCount[players[i]] = 0;
    }

    function changeEntryCost(uint256 _newCost) public onlyOwner {
        require(!raffleStatus, "Raffle is ongoing");
        entryCost = _newCost;
        emit EntryCostChanged(_newCost);
    }

    function withdrawBalance() public onlyOwner {
        require(address(this).balance > 0, "No balance to withdraw");

        uint256 balanceAmount = address(this).balance;

        payable(owner).transfer(balanceAmount);
        emit BalanceWithdrawn(balanceAmount);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function resetContract() public onlyOwner {
        delete playerSelector;
        delete players;
        raffleStatus = false;
        nftAddress = address(0);
        nftId = 0;
        entryCost = 0;
        totalEntries = 0;
        resetEntryCounts();
    }
}
