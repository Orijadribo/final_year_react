import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { profile_pic } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { VscFeedback } from "react-icons/vsc";
import "firebase/auth";
import { auth } from "../api/Firebase";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { firestore, doc, getDoc } from "../api/FirebaseFirestone";

const OptionsBar = ({ openSideBar, sideBar }) => {
  const [authUser, setAuthUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [regNo, setRegNo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest("#signOut")) {
        // setIsOpen(true);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //Floating message to the user upon successfull verification
        toast.success("Sign Out Successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 50,
          // Styling the pop-up message
          style: {
            backgroundColor: "#02B056",
            color: "#fff",
            textAlign: "center",
          },
          icon: false,
          // Remove the progress bar
          hideProgressBar: true,
          onClose: () => {
            // Redirect to login after the toast message is closed
            navigate(`/`);
          },
        });
        setIsOpen(!isOpen);

        console.log("User signed out successfully");
      })
      .catch((error) => console.log("Error signing not:", error));
  };

  // to handle user information
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  });

  // Get user information upon sign in such as firstname last name etc
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;
        const userRef = doc(firestore, "users", userId);

        try {
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const firstName = userData.firstName;
            const lastName = userData.lastName;
            const regNo = userData.regNo;
            setFirstName(firstName);
            setLastName(lastName);
            setRegNo(regNo);
          } else {
            console.error("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="w-[95%] sticky z-50 top-0 right-0">
      {/* User Information and shortcuts bar */}
      <div className="">
        <div className="flex flex-row items-center justify-between gap-4 bg-white px-4 py-2 rounded-xl shadow-sm w-full">
          {/* Search */}
          <div className="flex items-center justify-start py-1 w-1/2">
            <div className="md:hidden pr-2" onClick={openSideBar}>
              {sideBar ? <IoMdClose /> : <FaBars />}
            </div>
            <div className="hidden md:block">
              <CiSearch />
            </div>
            <input
              className="border-none focus:outline-none px-2 w-full"
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
            />
          </div>
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="px-5 hidden md:block">
              <div className="flex flex-row items-center relative justify-center px-1 gap-5">
                <div className="cursor-pointer">
                  <VscFeedback />
                </div>
                <div className="cursor-pointer">
                  <FaBell />
                </div>
                <div className="bg-white h-3 w-3 rounded-full absolute flex items-center justify-center top-0 right-0 cursor-pointer">
                  <div className="bg-[#FF0000] h-2 w-2 rounded-full"></div>
                </div>
              </div>
            </div>
            <h1 className="hidden md:block">
              {firstName ? "Hello " + firstName + "!" : ""}
            </h1>
            <div className="flex items-center justify-center rounded-full border h-8 w-8">
              <img src={profile_pic} alt="Default Porfile pic" />
            </div>

            {/* SignOut section */}
            <div id="signout" className="relative">
              <div
                onClick={toggleNavigation}
                className={`cursor-pointer transition-transform duration-500 transform ${
                  isOpen ? "rotate-0" : "rotate-180"
                }`}
              >
                {/* {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />} */}
                <IoIosArrowUp />
              </div>

              <div
                id="signOut"
                className={`absolute bg-white shadow-xl rounded-md right-0 top-10 ${
                  isOpen ? "" : "hidden"
                }`}
              >
                <div className="flex flex-col items-center justify-center py-2 px-10">
                  <div className="flex flex-col items-center justify-center gap-5 py-5">
                    <div className="flex items-center justify-center rounded-full border h-20 w-20">
                      <img src={profile_pic} alt="Default Porfile pic" />
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="flex gap-2">
                        <p>{firstName ? firstName : ""}</p>
                        <p>{lastName ? lastName : ""}</p>
                      </div>
                      <p>{regNo ? regNo : ""}</p>
                      <p>{authUser ? authUser.email : ""}</p>
                    </div>
                    <hr className="w-full" />
                    <div className="flex flex-col items-center justify-center hover:rounded-xl hover:bg-[#F4F6F9] py-1 w-full cursor-pointer">
                      {/* <Link to="/"> */}
                      <p onClick={handleSignOut}>Sign Out</p>
                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OptionsBar;
