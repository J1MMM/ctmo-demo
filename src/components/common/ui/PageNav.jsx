import { Box } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';

const PageNav = ({ navlinks }) => {

    const navlinksElements = navlinks?.map((item, index) => {
        return (
            <NavLink key={index} end to={item?.path} className={"classroom-navigation"} >
                {item?.title}
            </NavLink>
        )
    })

    return (
        <Box
            paddingX={3}
            pr={5}
            mt={-2}
            ml={-3}
            bgcolor={"#FFF"}
            borderBottom={1}
            borderColor={"#E7EBF1"}
            display={"flex"}
            sx={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
            }}
        >
            {navlinksElements}
        </Box>
    );
}

export default PageNav;
