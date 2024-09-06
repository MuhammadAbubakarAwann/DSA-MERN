import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insert, update, setUtilStatesFalse } from '../../../app/services/binaryTreeSlice';
import { incrementUniqueId } from '../../../app/services/utilities/uniqueIdSlice';
import { setExpandedNode } from '../../../app/services/utilities/expandedNodeSlice';
import { setEditableNode } from '../../../app/services/utilities/editableNodeSlice';
import { setDeleteNodeKey } from '../../../app/services/utilities/deleteNodeKeySlice';
import Xarrow from 'react-xarrows';

const TreeElement = ({ node, level = 0 }) => {
  const [leftValue, setLeftValue] = useState('');
  const [rightValue, setRightValue] = useState('');
  const [highlightColor, setHighlightColor] = useState('');
  const [editableText, setEditableText] = useState(node.value);
  const uniqueID = useSelector((state) => state.uniqueID);
  const expandedNode = useSelector((state) => state.expandedNode);
  const editableNode = useSelector((state) => state.editableNode);
  const searchedNodeKey = useSelector((state) => state.binaryTree.searchedKey || null);
  const visitedNodes = useSelector((state) => state.binaryTree.visitedNodes || []);
  const dispatch = useDispatch();

  const isExpanded = expandedNode === node?.id;
  const isEditable = editableNode === node?.id;

  const editableDivRef = useRef(null);
  const previousVisitedNodesRef = useRef([]);

  useEffect(() => {
    if (editableDivRef.current && isEditable) {
      editableDivRef.current.focus();
    }
  }, [isEditable]);

  useEffect(() => {
    setEditableText(node.value);
  }, [node]);

  useEffect(() => {
    if (visitedNodes.length && previousVisitedNodesRef.current !== visitedNodes) {
      previousVisitedNodesRef.current.forEach((key) => {
        if (key === node.key) {
          setHighlightColor('');
        }
      });

      let index = 0;
      const interval = setInterval(() => {
        if (index < visitedNodes.length) {
          const currentKey = visitedNodes[index];
          if (currentKey === node.key) {
            setHighlightColor('#1197a9');
            setTimeout(() => {
              setHighlightColor(currentKey === searchedNodeKey ? '#e48c11' : 'gray');
            }, 500);
          }
          index++;
        } else {
          clearInterval(interval);
          dispatch(setUtilStatesFalse({ traverStatus: false, searchedKey: null }));
        }
      }, 1500);

      previousVisitedNodesRef.current = visitedNodes;

      return () => clearInterval(interval);
    }
  }, [visitedNodes, searchedNodeKey, node.key, dispatch]);


  const handleInput = (event, side) => {
    const value = event.target.value;
    if (value.length > 2) {
      event.target.value = value.slice(0, 2);
    }
    if (side === 'left') {
      setLeftValue(event.target.value);
    } else {
      setRightValue(event.target.value);
    }
  };

  const handleKeyDown = (event, side) => {
    if (event.key === 'Enter') {
      handleInsert(side);
    }
  };

  const handleUpdateKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleNodeUpdate();
    }
  };

  const handleInsert = (side) => {
    const key = side === 'left' ? leftValue : rightValue;
    const value = key;
    dispatch(insert({ parentNodeKey: node.key, key, value, left: side === 'left', right: side === 'right', id: uniqueID }));
    dispatch(incrementUniqueId());
    if (side === 'left') {
      setLeftValue('');
    } else {
      setRightValue('');
    }
  };

  const handleNodeClick = (nodeID, nodeKey) => {
    dispatch(setExpandedNode(expandedNode === nodeID ? null : nodeID));
    dispatch(setDeleteNodeKey(nodeKey));
  };

  const handleNodeUpdate = () => {
    dispatch(update({ key: node.key, newValue: editableText }));
    dispatch(setEditableNode(null));
  };

  const handleEditableChange = (event) => {
    setEditableText(event.target.innerText);
    setCaretPositionToEnd(event.target);
  };

  const setCaretPositionToEnd = (element) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const horizontalSpacing = 200 / (level + 1);

  return (
    <>
      <div className='element-wrapper' id={`wrapper-${node.key}`}>
        <div className='inp-container'>
          <input
            type="text"
            className={`inp left ${isExpanded ? 'visible' : 'hidden'}`}
            id='left-child-inp'
            placeholder="Left"
            value={leftValue}
            onChange={(e) => handleInput(e, 'left')}
            onKeyDown={(e) => handleKeyDown(e, 'left')}
          />
          <div
            className={`tree-element ${isEditable ? 'editable' : ''}`}
            id={`Node-${node.id}`}
            onClick={() => handleNodeClick(node.id, node.key)}
            contentEditable={isEditable}
            ref={editableDivRef}
            style={{ backgroundColor: isEditable ? 'green' : highlightColor }}
            onInput={handleEditableChange}
            onKeyDown={handleUpdateKeyDown}
            suppressContentEditableWarning={true}
          >
            {editableText}
          </div>
          <input
            type="text"
            className={`inp right ${isExpanded ? 'visible' : 'hidden'}`}
            id='right-child-inp'
            placeholder="Right"
            value={rightValue}
            onChange={(e) => handleInput(e, 'right')}
            onKeyDown={(e) => handleKeyDown(e, 'right')}
          />
        </div>
        {node.left && (
          <div className='child-left' style={{ left: `-${horizontalSpacing}px` }}>
            <TreeElement node={node.left} level={level + 1} />
            <Xarrow
              start={`Node-${node.id}`}
              end={`Node-${node.left.id}`}
              color="black"
              strokeWidth={2}
              curveness={0}
              path='straight'
              showHead={false}
              startAnchor='left'
              endAnchor='top'
              zIndex={-5}
            />
          </div>
        )}
        {node.right && (
          <div className='child-right' style={{ right: `-${horizontalSpacing}px` }}>
            <TreeElement node={node.right} level={level + 1} />
            <Xarrow
              start={`Node-${node.id}`}
              end={`Node-${node.right.id}`}
              color="black"
              strokeWidth={2}
              curveness={0}
              path='straight'
              showHead={false}
              startAnchor='right'
              endAnchor='top'
              zIndex={-5}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TreeElement;
