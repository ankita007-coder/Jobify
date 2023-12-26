import React from "react";
import { FaWpforms } from "react-icons/fa";
import {MdAdminPanelSettings, MdQueryStats} from 'react-icons/md'
import { IoBarChart } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

const links = [
    {
        text: 'add job', 
        path: '.', 
        icon: <FaWpforms/>
    },
    {
        text: 'all jobs', 
        path: 'all-jobs', 
        icon: <MdQueryStats/>
    },
    {
        text: 'stats', 
        path: 'stats', 
        icon: <IoBarChart/>
    },
    {
        text: 'profile', 
        path: 'profile', 
        icon: <ImProfile/>
    },
    {
        text: 'admin', 
        path: 'admin', 
        icon: <MdAdminPanelSettings/>
    },
]

export default links;