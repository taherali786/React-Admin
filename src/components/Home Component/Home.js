import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Skeleton } from 'primereact/skeleton';
import './Home.css';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { div } from 'prelude-ls';

function Home() {

    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const items = [
        { label: 'Home' }
    ];

    const home = { icon: 'pi pi-home' }

    const [products, setProducts] = useState();
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [isloading, setisloading] = useState(false);

    const toast = useRef(null);
    const dt = useRef(null);
    const loadingArr = new Array(5);

    useEffect(() => {
        setTimeout(() => {
            axios.get('http://localhost:4000/admins/allbrands')
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                // setisloading(false);
                setProducts(res.data)
            })
            .catch((err)=>{
                console.log(err);
                // setisloading(false);
            })
        }, 1000);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = {...product};
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProduct(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        let _products = products.filter(val => !selectedProducts.includes(val));
        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _product = {...product};
        _product['category'] = e.value;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                 {isloading?
                    (
                    <div className="bg-dark" style={{width:'150px',height:'2.5rem',borderRadius:'10px'}}>
                    <Skeleton shape="rectangle" width="100%" height="2.5rem"></Skeleton>\
                    </div>
                    ):
                <BreadCrumb model={items} home={home}/>
                 }
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {isloading?(
                    <div className="bg-dark" style={{width:'100px',height:'2.5rem',borderRadius:'10px'}}>
                    <Skeleton shape="rectangle" width="100%" height="2.5rem"></Skeleton>\
                    </div>
                    ):
                <Button label="Add" icon="pi pi-plus" className="p-button-success" onClick={exportCSV} />
                }
            </React.Fragment>
        )
    }

    const imageBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Image</span>
                <img src={`showcase/demo/images/product/${rowData.image}`} 
                onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
                alt={rowData.image} className="product-image" />
             </React.Fragment>
        )
    }

    const usernameBodyTemplate = (rowData) => {
        
        return (
            <React.Fragment>
                <span className="p-column-title">Username</span>
               {rowData.username}
             </React.Fragment>
        )
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Name</span>
               {rowData.name}
             </React.Fragment>
        )
    }

    const codeBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Id</span>
               {rowData.id}
             </React.Fragment>
        )
    }

    const emailBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <span className="p-column-title">Email</span>
               {rowData.email}
             </React.Fragment>
        )
    }


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
            <span className="p-column-title"></span>
            {isloading?
                <React.Fragment>
                    <div className="row">
                        <Skeleton shape="circle" height="2rem" className="col-3 mr-1 ml-2"></Skeleton>
                        <Skeleton shape="circle" height="2rem" className=" col-3" ></Skeleton>
                    </div>
                </React.Fragment>
                :
                <React.Fragment>
                    <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
                </React.Fragment>
            
            }
            </React.Fragment>
        );
    }

    const bodyTemplate = () => {

        return <Skeleton></Skeleton>
                
           
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">
            {isloading?
                    (
                    <div className="bg-dark" style={{width:'150px',height:'2.5rem',borderRadius:'10px'}}>
                    <Skeleton shape="rectangle" width="100%" height="2.5rem"></Skeleton>
                    </div>
                    ):
                    'Manage Products'
                 }
            </h5>
            {isloading?
                    (
                    <div className="bg-dark" style={{width:'200px',height:'2.3rem',borderRadius:'10px'}}>
                    <Skeleton shape="rectangle" width="100%" height="2.3rem"></Skeleton>
                    </div>
                    ):
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
                    </span>
            }
           
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div className="container-fluid mt-2 ml-1">
          <div className="datatable-crud-demo datatable-responsive-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={isloading?loadingArr:products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator={isloading?false:true} rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} className="p-datatable-responsive-demo"
                    header={header}>
                        <Column field="id" header="ID" body={ isloading?bodyTemplate:codeBodyTemplate} sortable></Column>
                        <Column field="name" header="Name" body={ isloading?bodyTemplate:nameBodyTemplate} sortable></Column>
                        <Column header="Image" body={ isloading?bodyTemplate:imageBodyTemplate}></Column>
                        <Column field="username" header="Username" body={ isloading?bodyTemplate:usernameBodyTemplate} sortable></Column>
                        <Column field="email" header="Email" body={ isloading?bodyTemplate:emailBodyTemplate} sortable></Column>
                        <Column body={actionBodyTemplate}></Column>                
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`showcase/demo/images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image" />}
                <div className="p-field">
                    <label htmlFor="name">Name</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="p-field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="p-field">
                    <label className="p-mb-3">Category</label>
                    <div className="p-formgrid p-grid">
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="p-field-radiobutton p-col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="p-formgrid p-grid">
                    <div className="p-field p-col">
                        <label htmlFor="price">Price</label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="p-field p-col">
                        <label htmlFor="quantity">Quantity</label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
        </div>
        
    );
}

export default Home
