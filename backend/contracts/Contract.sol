// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";

contract NFTRaffleContract {
    address public owner;
    mapping(address => uint256) public entryCount;
    address[] public players;
    address[] playerSelector;
    bool public raffleStatus;
    uint256 public entryCost;
    address public nftAddress;
    uint256 public nftId;
    uint256 public totalEntries;

    event NewEntry(address player);
    event RaffleStarted();
    event RaffleEnded();
    event WinnerSelected(address winner);
    event EntryCostChanged(uint256 newCost);
    event NFTPrizeSet(address nftAddress, uint256 nftId);
    event BalanceWithdrawn(uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    constructor(uint256 _entryCost) {
        owner = msg.sender;
        entryCost = _entryCost;
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

        uint256 winnerIndex = playerSelector.length - 1;
        address winner = playerSelector[winnerIndex];
        emit WinnerSelected(winner);

        ERC721Base(nftAddress).transferFrom(owner, winner, nftId);
        resetContract();
    }

    // function random() private view returns (uint256) {
    //     return
    //         uint256(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players.length)));
    // }

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
