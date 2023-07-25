// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
contract NFT is ERC721URIStorage {
   
    uint _tokenIds=0;

    address public owner;
    uint256 public cost;
    mapping(address=>uint[]) tokens;
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cost
    ) ERC721(_name, _symbol) {
        owner = msg.sender;
        cost = _cost;
    }

    function mint(string memory tokenURI) public payable {
        require(msg.value >= cost);

        _tokenIds++;

        uint256 newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokens[msg.sender].push(_tokenIds);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }

    function withdraw() public {
        require(msg.sender == owner);
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
    function transferNFT(address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Transfer caller is not owner nor approved");
        _transfer(msg.sender, to, tokenId);
        _removeTokenId(msg.sender, tokenId);
        tokens[to].push(tokenId);
    }

    function _removeTokenId(address ownerAddress, uint256 tokenId) internal {
        uint256[] storage userTokens = tokens[ownerAddress];
        for (uint256 i = 0; i < userTokens.length; i++) {
            if (userTokens[i] == tokenId) {
                userTokens[i] = userTokens[userTokens.length - 1];
                userTokens.pop();
                break;
            }
        }
    }

    function getTokenIds() public view returns (uint256[] memory) {
        return tokens[msg.sender];
    }

   
}
