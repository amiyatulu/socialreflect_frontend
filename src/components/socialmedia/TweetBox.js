import React from 'react';
import "./TweetBox.css"
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';


const blue = {
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
  };
  
  const grey = {
    100: '#eaeef2',
    300: '#afb8c1',
    900: '#24292f',
  };
  
  const CustomButton = styled(ButtonUnstyled)(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-weight: bold;
    font-size: 0.875rem;
    background-color: ${blue[500]};
    padding: 12px;
    border-radius: 12px;
    color: white;
    transition: all 150ms ease;
    margin-left: 12px;
    cursor: pointer;
    border: none;
    box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};
  
    &:hover {
      background-color: ${blue[600]};
    }
  
    &.${buttonUnstyledClasses.active} {
      background-color: ${blue[700]};
    }
  
    &.${buttonUnstyledClasses.focusVisible} {
      box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
      outline: none;
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
    `,
  );
  

function TweetBox() {
    return (
        <div className="tweeetBox">
            <form>
                <div className="tweetBox__input">
                <input type="text" placeholder='Type your tweet'/>
                </div>
                <CustomButton>Tweet</CustomButton>
            </form>

        </div>
    )
}

export default TweetBox