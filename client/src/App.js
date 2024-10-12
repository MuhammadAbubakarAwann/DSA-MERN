
import { BrowserRouter as Router, Routes, Route, useActionData, Navigate } from 'react-router-dom';
import NavBar from "./components/NavBar";
import StackComponent from "./components/DSAComponents/stack/StackComponent";
import ArrayComponent from "./components/DSAComponents/arrays/ArrayComponent";
import ObjectComponent from './components/DSAComponents/objects/ObjectComponent';
import ListComponent from './components/DSAComponents/linked-list/ListComponent';
import BinaryTreeComponent from './components/DSAComponents/binaryTree/BinaryTreeComponent';
import DoublyListComponent from './components/DSAComponents/doubly-LinkedList/DoublyListCompontnts';
import CircularListComponent from './components/DSAComponents/circularLinkedList/CircularListComponent';
import HashComponent from './components/DSAComponents/hashing/HashComponent';
import CacheComponent from './components/DSAComponents/caching/CacheComponent';
import QueueComponent from './components/DSAComponents/queues/QueueComponent';
import CircularQueueComponent from './components/DSAComponents/circilarQueue/CircularQueueComponent';
import PriorityQueueComponents from './components/DSAComponents/priorityQueue/PriorityQueueComponents';
import BSTComponent from './components/DSAComponents/binarySearchTree/BSTComponent';
import Auth from './components/authentication/Auth';
import { useDispatch, useSelector } from 'react-redux';
import PremiumRoute from './components/authorization/PremiumRoute';
import PaymentSuccess from './components/authorization/PaymentSuccess';
import PaymentCancel from './components/authorization/PaymentCancel';
import GlobalToaster from './utils/GlobalToaster';
import Logout from './components/authentication/logout/Logout';
import { logout } from './app/services/auth/authSlice';
import { useEffect } from 'react';
import { showToast } from './app/services/utilities/toastSlice';


function App() {
  const dispatch = useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userEmail = useSelector((state) => state.auth.email);

  useEffect(() => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      const currentTime = new Date().getTime();

      console.log("Current Time:", currentTime);
      console.log("Token Expiration Time:", expirationTime);

      if (currentTime > expirationTime) {
        console.log("Session has expired, logging out.");
        dispatch(logout());
        dispatch(showToast({ type: 'warning', message:  "Login Session expired, please log in again."  }));

      } else {
        const timeRemaining = expirationTime - currentTime;

        setTimeout(() => {
          console.log("Token has expired");
          dispatch(logout());
          dispatch(showToast({ type: 'warning', message:  "Login Session expired, please log in again."  }));

        }, timeRemaining);
      }
    }
  }, [dispatch, isAuthenticated]);



  return (
    <>
      <Router>
        {!isAuthenticated ? (
          <>
            <Auth />

          </>
        ) : (
          <>

            <NavBar />
            <Routes>
              <Route path="/stack" element={<StackComponent />} />
              <Route path="/queue" element={<QueueComponent />} />
              <Route path="/circularQueue" element={
                <PremiumRoute>
                  <CircularQueueComponent />
                </PremiumRoute>} />
              <Route path="/priorityQueue" element={
                <PremiumRoute>
                  <PriorityQueueComponents />
                </PremiumRoute>} />
              <Route path="/array" element={<ArrayComponent />} />
              <Route path="/object" element={<ObjectComponent />} />
              <Route path="/list" element={
                <PremiumRoute>
                  <ListComponent />
                </PremiumRoute>} />
              <Route path="/doublyList" element={
                <PremiumRoute>
                  <DoublyListComponent />
                </PremiumRoute>} />
              <Route path="/circularList" element={
                <PremiumRoute>
                  <CircularListComponent />
                </PremiumRoute>} />
              <Route path="/binaryTree" element={
                <PremiumRoute>
                  <BinaryTreeComponent />
                </PremiumRoute>} />
              <Route path="/binarySearchTree" element={
                <PremiumRoute>
                  <BSTComponent />
                </PremiumRoute>} />
              <Route path="/hashing" element={
                <PremiumRoute>
                  <HashComponent />
                </PremiumRoute>} />
              <Route path="/caching" element={
                <PremiumRoute>
                  < CacheComponent />
                </PremiumRoute>} />

              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />

            </Routes>
            <Logout />
            
              <p>user Email : {userEmail}</p>
            

          </>

        )
        }
      </Router>
      <GlobalToaster />
    </>


  );
}

export default App;
