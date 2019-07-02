// solium-disable linebreak-style
pragma solidity ^0.5.1;

contract Auction {

    address payable private owner;
    string private itemUrl;
    string private name;
    string private description;
    uint256 private basePrice;
    uint256 private minimumPrice;
    uint256 private maximumPrice;
    uint256 private maximumQuantityOfBids;
    uint256 private bidsCount;
    uint256 private money;
    Bid private actualBid;
    bool open;
    bool isPrivate;

    /* Mappings */
    mapping(uint => Bid) private bids;

    /* Structs */
    struct Bid{
        address payable bidder;
        uint256 bid;
    }

    constructor(string memory auctionItemUrl, string memory auctionName, string memory auctionDescription,
        uint256 auctionBasePrice, uint256 auctionMinimumPrice, uint256 auctionMaximumPrice, uint256 quantityOfBids,
        bool isPrivateData) payable public {

        owner = msg.sender;
        name = auctionName;
        description = auctionDescription;
        itemUrl = auctionItemUrl;
        basePrice = auctionBasePrice;
        minimumPrice = auctionMinimumPrice;
        maximumPrice = auctionMaximumPrice;
        Bid memory minimumBid = Bid(msg.sender, auctionBasePrice);
        actualBid = minimumBid;
        open = true;
        maximumQuantityOfBids = quantityOfBids;
        isPrivate = isPrivateData;
        bidsCount = 0;
    }

    /* Events */
    event publishBid(address winner, uint256 bidValue);
    event publishWinner(address winner, uint256 bidValue);

    /* Modifiers */
    modifier onlyOwner(){
        require(msg.sender == owner, "Only the owner can do this");
        _;
    }

    modifier isBiggerThanActualBid(){
        require(msg.value > actualBid.bid, "You have to bid an amount bigger than the actual bid");
        _;
    }

    modifier isNotSameBidderThanActualBid(){
        require(msg.sender != actualBid.bidder,
        "You are the actual maximum bidder, wait before the auction ends of when someone surpass your bid");
        _;
    }

    modifier isNotPrivateData(){
        require(isPrivate != true || msg.sender == owner, "The data is private only the owner can reach it");
        _;
    }

    modifier isAuctionOpen(){
        require(open == true, "Auction is close");
        _;
    }

    modifier isAuctionClose(){
        require(open == false, "Auction is open");
        _;
    }

    modifier isMinimumReached(){
        require(actualBid.bid >= minimumPrice, "The minimum price hasnt been reached yet.");
        _;
    }

    modifier hasBalance(){
        require(money > 0, "Needs balance");
        _;
    }

     /* Functions */
    function addBid() public payable isBiggerThanActualBid() isNotSameBidderThanActualBid() isAuctionOpen() {
        Bid memory newBid = Bid(msg.sender, msg.value);
        bids[bidsCount] = newBid;
        bidsCount++;
        sendMoneyBidder();
        money = address(this).balance;
        actualBid = newBid;
        finishedAuction();
    }

    function sendMoneyBidder () public payable {
        if (bidsCount>1) {
            address payable bidder = actualBid.bidder;
            uint256 bid = actualBid.bid;
            bidder.transfer(bid);
        }
    }

    function publishBids() private isAuctionClose() {
        uint count = 0;
        for (uint i = 0; i < bidsCount; i++){
            emit publishBid(bids[i].bidder, bids[i].bid);
            count++;
        }
    }

    function finishedAuction() private isAuctionOpen() {
        if(bidsCount == maximumQuantityOfBids || actualBid.bid >= maximumPrice){
            open = false;
            publishBids();
            emit publishWinner(actualBid.bidder, actualBid.bid);
            sendMoneyOwner();
        }
    }

    function sendMoneyOwner() public payable isAuctionClose() {
        uint256 bid = actualBid.bid;
        owner.transfer(bid);
    }

    function closeAuction() public onlyOwner() isMinimumReached() isAuctionOpen() {
        open = false;
        publishBids();
        emit publishWinner(actualBid.bidder, actualBid.bid);
        sendMoneyOwner();
    }

    /* Getters */
    function getActualBid() public view returns(uint256){
        return actualBid.bid;
    }

    function getAuctionName() public view returns(string memory){
        return name;
    }

    function getAuctionDescription() public view returns(string memory){
        return description;
    }

    function getAuctionBasePrice() public view returns(uint256){
        return basePrice;
    }

    function getAuctionMinimumPrice() public view isNotPrivateData() returns(uint256){
        return minimumPrice;
    }

    function getAuctionMaximumPrice() public view isNotPrivateData() returns(uint256){
        return maximumPrice;
    }

    function getAuctionBidsCount() public view isNotPrivateData() returns(uint256){
        return bidsCount;
    }

    function getMoneyBalance() public view onlyOwner() returns(uint256){
        return address(this).balance;
    }

    function getBids()
        public view
        onlyOwner()
        returns (address[] memory, uint256[] memory)
    {
        address[] memory addressess = new address[](bidsCount);
        uint256[] memory bidsMaked = new uint256[](bidsCount);
        for (uint256 i = 0; i < bidsCount; i++){
            addressess[i] = bids[i].bidder;
            bidsMaked[i] = bids[i].bid;
        }
        return (addressess, bidsMaked);
    }
}