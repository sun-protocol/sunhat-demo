// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../contracts/Lock.sol";

contract TokenTest is Test {
    Lock l;
    uint256 public unlockTimeDelta = 86400;
    uint256 public startTime;
    address public owner;
    address public user;

    function setUp() public {
        owner = vm.addr(0xA11CE);
        user = vm.addr(0xB0B0E);
        vm.label(owner, "owner");
        vm.label(user,"user");
        vm.deal(owner, 100 ether);
        startTime = block.timestamp;
        vm.prank(owner);
       
        l = new Lock{value: 1 ether}(startTime + unlockTimeDelta);
    }

    function testUnlockTime() public {
        assertEq(l.unlockTime(), startTime + 86400);
    }

    function testOwner() public {
        assertEq(l.owner(), owner);
    }

    function testBalanceOfOwner() public {
        assertEq(owner.balance, 99 ether);
    }

    function testBalanceOfLock() public {
        assertEq(address(l).balance, 1 ether);
    }

    function testDeployedFailWithErrUnlockTime() public {
        vm.prank(owner);
        vm.expectRevert("Unlock time should be in the future");
        l = new Lock{value: 1 ether}(startTime);
    }

    function testWithdrawEarly() public {
        vm.prank(owner);
        vm.expectRevert("You can't withdraw yet");
        l.withdraw();
    }

    function testWithdrawWithAnotherUser() public {
        vm.warp(86401);
        vm.prank(user);
        vm.expectRevert("You aren't the owner");
        l.withdraw();
    }
    function testWithdrawSuccess() public {
        vm.warp(86401);
        vm.prank(owner);
        l.withdraw();
        vm.breakpoint("a");
        assertEq(owner.balance, 100 ether);
        assertEq(address(l).balance, 0);
    }
}