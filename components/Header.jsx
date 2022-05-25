import React from 'react';
import Link from "next/link";

import { Menu,Icon} from 'semantic-ui-react';


const Header = () =>{

    return(
        <Menu style={{marginTop: '10px'}}>
            <Link href='/'>
                <Menu.Item >
                    <Icon name='ethereum' circular inverted color='teal' size='large'/>
                    CrowdCoin
                </Menu.Item>            
            </Link>

            <Menu.Menu position="right">
                <Link href="/">
                    <Menu.Item>Campaigns</Menu.Item>
                </Link>
                <Link href="/campaigns/new">
                    <Menu.Item>
                        +
                    </Menu.Item>
                </Link>
            </Menu.Menu>
        </Menu>
    )
};


export default Header;