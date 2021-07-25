import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Skeleton } from 'primereact/skeleton';
import '../../global css/Skeleton.css';

import React, { useState } from 'react'

function Footer() {

    const [isloading, setisloading] = useState(true);
    setTimeout(() => {
       setisloading(false)
    }, 3000);
    
    return (
        <div>
            
            {/* Left navbar links */}
            <footer className="main-footer">
                {isloading
                    ?(
                        <>  
                            <div className="p-grid">  
                                        <div className="p-col-10">
                                            <Skeleton shape="rectangle" width="32%" height="1.3rem" ></Skeleton>
                                        </div>    
                                        <div className="p-col-2">
                                            <Skeleton shape="rectangle" height="1.3rem" ></Skeleton>
                                        </div>      
                            </div>
                        </>
                    )                
                    :(  
                        <>
                            <strong>Copyright © 2014-2021 </strong>
                            All rights reserved.
                            <div className="float-right d-none d-sm-inline-block">
                            <b>Version</b> 3.1.0
                            </div>
                        
                        </>
                    )}
            </footer>
            {/* <Skeleton shape="rectangle" width="80%" height="2rem" /> */}
        </div>

)
}

export default Footer
