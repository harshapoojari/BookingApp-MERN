import React from 'react';
import {FaFacebook, FaInstagram,FaLinkedin ,FaGithub} from 'react-icons/fa'
const Footer = () => {
  return (
    <footer className="border-t-2  py-4">
      <div className="container mx-auto text-center flex justify-between">
       <div className='-ml-12'>
       <p>&copy; 2024 Harsha Poojari. All rights reserved.</p>
        </div>
        {/* <p>This code is licensed under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>.</p> */}
        <div className='flex gap-3 -mr-12'>
           <a href="https://m.facebook.com/story.php?story_fbid=100222657825474&id=100035132190361"><FaFacebook size={25}/></a>
           <a href="https://www.instagram.com/_harsha_poojari_007/"><FaInstagram size={25}/></a>
           <a href="https://www.linkedin.com/in/harsha-poojari-779aa9221"><FaLinkedin size={25}/></a>
           <a href="https://github.com/harshapoojari"><FaGithub size={25}/></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;