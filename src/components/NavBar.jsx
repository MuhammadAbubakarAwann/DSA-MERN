import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="container mt-3 d-flex justify-content-center">
      <ul className="nav nav-pills flex-wrap justify-content-center" role="tablist">
        <li className="nav-item">
          <NavLink className="nav-link" to="/stack">Stack</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/queue">Queue</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/circularQueue">Circular Queue</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/priorityQueue">priority Queue</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/array">Array</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/object">Object</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/list">Linked List</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/doublyList">Doubly Linked List</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/circularList">Circular Linked List</NavLink>
        </li> 
        <li className="nav-item">
          <NavLink className="nav-link" to="/binaryTree">Binary Tree</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/binarySearchTree">Binary Search Tree</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/hashing">Hashing</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/caching">Caching</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;