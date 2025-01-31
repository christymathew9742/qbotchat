"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { Box, Tabs, Tab } from '@mui/material';

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

interface TabComponentProps {
  tabData: { label: string; content: React.ReactNode }[];
}

const TabModal: React.FC<TabComponentProps> = ({ tabData }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = useCallback((event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  }, []);

  const renderedTabs = useMemo(() => (
    tabData.map((tab, index) => (
      <Tab
        key={index}
        label={tab.label}
        id={`tab-${index}`}
        aria-controls={`tabpanel-${index}`}
      />
    ))
  ), [tabData]);

  const renderedTabPanels = useMemo(() => (
    tabData.map((tab, index) => (
      <TabPanel key={index} value={value} index={index}>
        {tab.content}
      </TabPanel>
    ))
  ), [tabData, value]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="dynamic tabs">
          {renderedTabs}
        </Tabs>
      </Box>
      {renderedTabPanels}
    </Box>
  );
};

export default TabModal;


//   const tabData = [
//     {
//       label: 'Tab 1',
//       content: (<>conten1t</>)
//     },{
//       label: 'Tab 2',
//       content: (<>content2</>)
//     },{
//       label: 'Tab 3',
//       content: (<>content3</>)
//     }
//   ]
//   useEffect(()=> {
//     dispatch(fetchUserRequest(accessToken));
//   },[])
//   const tabLabel =['Settings','Profile']


//   return (
//       <TabModal tabData={tabData}/>
//   );
// };

