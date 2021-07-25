/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import { Skeleton } from 'primereact/skeleton';
import '../../global css/Skeleton.css';
import React, { useState } from 'react';
import { Link,NavLink } from 'react-router-dom';

function Menu() {

    const [isloading, setisloading] = useState(true);

    setTimeout(() => {
       setisloading(false)
    }, 3000);

    const products = [0,1,2,3]

    const bodyTemplate =  products.map(item=><Skeleton shape="rectangle" width="100%" height="2rem" className="mt-1"></Skeleton>)
    
    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                {isloading
                    ?(
                        <div className="p-grid ">  
                            <Skeleton shape="circle" width="13%" height="2rem" className="mr-2 ml-4 grid-height"></Skeleton>
                            <Skeleton shape="rectangle" width="60%" height="1.3rem" className="mt-3"></Skeleton>
                        </div>
                    )                
                    :(  
                        <>
                            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                            <span className="brand-text font-weight-light">Admin Panel</span>
                        </>
                    )}
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                    {isloading?<Skeleton shape="circle" width="110%" height="2rem" className="ml-1 mr-4"></Skeleton>
                            :<img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
                    }
                    </div>
                    <div className="info">
                    {isloading?<Skeleton shape="rectangle" width="100%" height="1.3rem" className="ml-1 mr-5"></Skeleton>
                              :<a href="index3.html" className="d-block">Taher</a>
                    }
                    </div>
                </div>
                {/* SidebarSearch Form */}
                <div className="form-inline">
                {isloading?<Skeleton shape="rectangle" width="100%" height="2rem" ></Skeleton>
                            :<div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                    <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                }
                </div>
                {/* Sidebar Menu */}
                {/* <Router> */}
                    <nav className="mt-2">
                        {isloading?bodyTemplate
                        :<ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open">
                                
                                <NavLink to="/"  exact activeClassName="active" className="nav-link">
                                {/* <a href="javascript:void(0)" className="nav-link active"> */}
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                            Dashboard
                                    </p>
                                {/* </a> */}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                
                                <NavLink to="/home" activeClassName="active" className="nav-link">
                                {/* <a href="javascript:void(0)" className="nav-link active"> */}
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>
                                            Home
                                    </p>
                                {/* </a> */}
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" activeClassName="active" className="nav-link">
                                {/* <a href="javascript:void(0)" className="nav-link"> */}
                                    <i className="nav-icon fas fa-copy" />
                                    <p>
                                        About
                                        <i className="fas fa-angle-left right" />
                                        <span className="badge badge-info right">6</span>
                                    </p>
                                {/* </a> */}
                                </NavLink>
                                <ul className="nav nav-treeview">
                                    <li>
                                        <a href="pages/layout/collapsed-sidebar.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Collapsed Sidebar</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-header">EXAMPLES</li>
                        </ul>
                        }
                    </nav>
                    {/* <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/about" component={About} />
                </Switch> */}
                    {/* <Routing /> */}
                {/* </Router> */}
                {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
            </aside>
        </div>
)
}

export default Menu
