import React , {useState} from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Popup (props) {
    const sendForm = (e) => {
        e.preventDefault();
        const isConfirm = window.confirm(`Confirm Your Edit for this ${props.name}`)
        if (isConfirm){
            if (props.name === 'employee'){
                axios.post(`${process.env.REACT_APP_API_URL}/admin/${props.name}` , {
                    employID : props.id,
                    employ_fname : props.employ_fname,
                    employ_lname : props.employ_lname,
                    employ_phone : props.employ_phone,
                    employ_Hours : props.employ_Hours,
                    tip_amount : props.tip_amount,
                    payrate : props.payrate
                },
                {
                    withCredentials : true,
                    headers: {
                        Authorization: `Bearer ${props.token}`,
                    }
                }
                ).then((resp) => {
                    alert(resp.data.msg);
                    props.setIsOpen(prevState => !prevState);
                    props.setdataSubmit(prevState => !prevState);
                })
            }
            else if (props.name === 'services'){
                if (props.method === 'update'){
                    axios.post(`${process.env.REACT_APP_API_URL}/admin/${props.name}` , {
                        name : props.method,
                        employID : props.id,
                        employ_fname : props.employ_fname,
                        employ_lname : props.employ_lname,
                        employ_phone : props.employ_phone,
                    },
                    {
                        withCredentials : true,
                        headers: {
                            Authorization: `Bearer ${props.token}`,
                        }
                    }
                    ).then((resp) => {
                        alert(resp.data.msg);
                        props.setIsOpen(prevState => !prevState);
                        props.setdataSubmit(prevState => !prevState);
                    })
                }
                else if (props.method === 'add'){
                    axios.post(`${process.env.REACT_APP_API_URL}/admin/${props.name}` , {
                        name : props.method,
                        employID : props.id,
                        employ_fname : props.employ_fname,
                        employ_lname : props.employ_lname,
                        employ_phone : props.employ_phone,
                    },
                    {
                        withCredentials : true,
                        headers: {
                            Authorization: `Bearer ${props.token}`,
                        }
                    }
                    ).then((resp) => {
                        alert(resp.data.msg);
                        props.setIsOpen(prevState => !prevState);
                        props.setdataSubmit(prevState => !prevState);
                    })
                }
            }
            else if (props.name === 'customer'){
                if (props.method === 'update'){
                    axios.post(`${process.env.REACT_APP_API_URL}/admin/${props.name}` , {
                        name : props.method,
                        employID : props.id,
                        employ_fname : props.employ_fname,
                        employ_lname : props.employ_lname,
                        employ_phone : props.employ_phone,
                    },
                    {
                        withCredentials : true,
                        headers: {
                            Authorization: `Bearer ${props.token}`,
                        }
                    }
                    ).then((resp) => {
                        alert(resp.data.msg);
                        props.setIsOpen(prevState => !prevState);
                        props.setdataSubmit(prevState => !prevState);
                    })
                }
                else if (props.method === 'add'){
                    axios.post(`${process.env.REACT_APP_API_URL}/admin/${props.name}` , {
                        name : props.method,
                        employID : props.id,
                        employ_fname : props.employ_fname,
                        employ_lname : props.employ_lname,
                    },
                    {
                        withCredentials : true,
                        headers: {
                            Authorization: `Bearer ${props.token}`,
                        }
                    }
                    ).then((resp) => {
                        alert(resp.data.msg);
                        props.setIsOpen(prevState => !prevState);
                        props.setdataSubmit(prevState => !prevState);
                    })
                }
            }
        }
    }

    return (
		<div className={`${!props.isOpen? "opacity-100" : "hidden" } fixed left-0 top-0 inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10`}>
			<div className="w-full -mt-5 -mr-24 max-w-2xl overflow-y-auto sm:rounded-2xl bg-white h-fit bg-center bg-cover bg-no-repeat">
                <div className=' flex justify-between p-4'>
                    <span className=' text-xl font-sans font-medium'>Edit {props.id}</span>
                    <div className=' order-last'>
                        <button className = " hover:rounded-full hover:bg-gray-200 rounded-none p-2" onClick={ () => props.setIsOpen(!props.isOpen)}>
                            <FontAwesomeIcon className=' text-xl' icon={faXmark} />
                        </button>
                    </div>
                </div>
                <hr></hr>
                {props.name === 'employee' &&(
                    <div className=" p-8">
                        <form className="">
                        <div className='grid grid-cols-2 gap-6'>
                                <div className="">
                                    <label for="fname" className="block text-md text-gray-800">first name</label>
                                    <input value={props.employ_fname} onChange={(e) => props.setEmployfn(e.target.value)}name="fname" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="lname" className="block text-md text-gray-800">last name</label>
                                    <input value={props.employ_lname} onChange={(e) => props.setEmployln(e.target.value)} name = "lname"  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="phone" className="block text-md text-gray-800">Phone#</label>
                                    <input value={props.employ_phone} onChange={(e) => props.setEmployph(e.target.value)}  name = "phone" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="hours" className="block text-md text-gray-800">Hours</label>
                                    <input value={props.employ_Hours} onChange={(e) => props.setEmployhr(e.target.value)} name = "hours"  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="tip" className="block text-md text-gray-800">Tip</label>
                                    <input value={props.tip_amount} onChange={(e) => props.setTipAmount(e.target.value)}  name = "tip" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="payrate" className="block text-md text-gray-800">Payrate</label>
                                    <input value={props.payrate} onChange={(e) => props.setPayRate(e.target.value)} name = "payyrate"  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                            </div>
                        </form>         
                    </div>
                    )
                }

                {props.name === 'services' && (
                    <div className=" p-8">
                        <form className="">
                            <div className='grid grid-cols-2 gap-6'>
                                <div className="">
                                    <label for="fname" className="block text-md text-gray-800">Service Name</label>
                                    <input value={props.employ_fname} onChange={(e) => props.setEmployfn(e.target.value)}name="fname" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="lname" className="block text-md text-gray-800">Description</label>
                                    <input value={props.employ_lname} onChange={(e) => props.setEmployln(e.target.value)} name = "lname"  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="phone" className="block text-md text-gray-800">Price</label>
                                    <input value={props.employ_phone} onChange={(e) => props.setEmployph(e.target.value)}  name = "phone" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                            </div>
                        </form>         
                    </div>
                )}

                {props.name === 'customer' && props.method === "update" &&(
                    <div className=" p-8">
                        <form className="">
                            <div className='grid grid-cols-2 gap-6'>
                                <div className="">
                                    <label for="fname" className="block text-md text-gray-800">Username</label>
                                    <input value={props.employ_fname} onChange={(e) => props.setEmployfn(e.target.value)}name="fname" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="lname" className="block text-md text-gray-800">Password</label>
                                    <input value={props.employ_lname} onChange={(e) => props.setEmployln(e.target.value)} name = "lname"  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                {props.employ_phone !== null? (
                                    <div className="">
                                        <label for="phone" className="block text-md text-gray-800">Reward</label>
                                        <input value={props.employ_phone} onChange={(e) => props.setEmployph(e.target.value)}  name = "phone" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                    </div>
                                ):null}
                            </div>
                        </form>         
                    </div>
                )}

                {props.name === 'customer' && props.method === 'add' &&(
                    <div className=" p-8">
                        <form className="">
                            <div className='grid grid-cols-2 gap-6'>
                                <div className="">
                                    <label for="fname" className="block text-md text-gray-800">Username</label>
                                    <input value={props.employ_fname} onChange={(e) => props.setEmployfn(e.target.value)}name="fname" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                                <div className="">
                                    <label for="lname" className="block text-md text-gray-800">Password</label>
                                    <input value={props.employ_lname} onChange={(e) => props.setEmployln(e.target.value)} name = "lname"  className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                                </div>
                            </div>
                        </form>         
                    </div>
                )}


                <hr></hr>
                <div className=' p-8'>
                    <button onClick={sendForm} className=' w-[100px] text-white bg-sky-400 hover:opacity-50 transition-all ease-in-out delay-100 duration-200 shadow-md py-2'>Save All</button>   
                </div>   
			</div>
		</div>
    );
};

export default Popup;