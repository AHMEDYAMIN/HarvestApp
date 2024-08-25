import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const iconMapping = {
    'Alfalah Islamic Money Market Fund': require('../Images/alfa.png'),
    'Meezan Cash Fund': require('../Images/meezan.png'),
    'Al Meezan Mutual Fund': require('../Images/meezan.png'),
    'HBL Islamic Savings Fund': require('../Images/hbl.png'),
    'HBL Islamic Asset Allocation Fund': require('../Images/hbl.png'),
    'HBL Islamic Stock Fund': require('../Images/hbl.png'),
    'HBL Islamic Equity Fund': require('../Images/hbl.png'),
    'HBL Islamic Equity Fund': require('../Images/hbl.png'),
    'HBL Islamic Equity Fund': require('../Images/hbl.png'),
    'HBL Islamic Equity Fund': require('../Images/hbl.png'),
    'HBL Islamic Equity Fund': require('../Images/hbl.png'),
    'HBL Islamic Money Market Fund' : require('../Images/hbl.png'),
    'HBL Islamic Income Fund' : require('../Images/hbl.png'),


};



const initialState = {
  funds: [],
};

const fundsSlice = createSlice({
  name: 'funds',
  initialState,
  reducers: {
    setFunds: (state, action) => {
      state.funds = action.payload;
    },
  },
});

export const { setFunds } = fundsSlice.actions;

export const fetchFunds = (token) => async (dispatch) => {
    try {
      const response = await axios.get('https://api.getharvest.app/funds/all', {
        headers: {
          Authorization: `${token}`, // Pass the token exactly as it is
        },
      });
  
      const fundsWithIcons = response.data.map(fund => ({
        ...fund,
        icon: iconMapping[fund.name] || require('../Images/meezan.png'), // Fallback to a default icon if not found
      }));
  
      dispatch(setFunds(fundsWithIcons));
    } catch (error) {
      if (error.response) {
          console.error('Failed to fetch funds:', error.response.data); // Log the response data
          console.error('Status:', error.response.status); // Log the response status
      } else {
          console.error('Failed to fetch funds:', error.message); // Log general error message
      }
    }
  };
  
  

export default fundsSlice.reducer;
