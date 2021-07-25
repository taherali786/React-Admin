

import React from 'react'
import Routing from '../Routing/Routing'
import { BrowserRouter as Router} from 'react-router-dom';
import Menu from './includes/Menu';


function RouterOutlet() {

    
    return (
        <Router>
                <Menu />
                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <Routing />
                
                </div>
        </Router>

        )
}

export default RouterOutlet
