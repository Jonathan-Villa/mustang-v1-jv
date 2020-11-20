import {
  IconButton,
} from "@material-ui/core";
import { RiAddCircleFill } from "react-icons/ri";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import {} from "react-icons";

function Icons(props) {
  const icons = [
    { type: "CREATE", icon: <RiAddCircleFill /> },
    { type: "UPDATE", icon: <AiFillEdit /> },
    { type: "DELETE", icon: <AiFillDelete /> },
  ];

  const handleIconClick = (e) => {
    props.setIconClick(e.target.value);
    console.log(e.target.value)
  };

  return (
   <div>
     
   </div>
  );
}

export default Icons;
