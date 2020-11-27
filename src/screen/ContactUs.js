import axios from 'axios';
import React from 'react';
import IsUploading from './IsUploading';
import UploadSucess from './UploadSucess';
// var cloudinary = require('cloudinary').v2
class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedFile: null,
            isUploading:false,
            uploaded : localStorage.getItem("uploaded") ? true : false,
            // uploaded : false,
            errorMessage : false,
            name:"",
            email:"",
            aemail:""
        }
    }
    onFileChange = (event) => { 
        this.setState({ selectedFile : event.target.files[0]});
         
        // console.log(this.state.selectedFile);
      }; 

      upload=()=>{
        const data = new FormData();
        data.append('file',this.state.selectedFile)
        data.append('upload_preset','UserProfile')
        data.append("cloud_name","dd0txohwe")
        fetch("https://api.cloudinary.com/v1_1/dd0txohwe/image/upload",{
          method:"POST",
          body:data
        }).then(res=>res.json())
        .then((data) => {
              axios.post('https://amityform2.herokuapp.com/form/api',{
                "name":this.state.name,
                "email":this.state.email,
                "aemail":this.state.aemail,
                "uri":data.url
            })
              .then(()=>{
                localStorage.setItem("uploaded",true);
                this.setState({isUploading:false,uploaded:true});
              })
              .catch(e=>alert("Please Contact Administration"))
          })
          .catch((err) => {
              console.log(err);
          })  
        // cloudinary.v2.uploader.upload(formData, 
        // { resource_type: "auto" }, 
        // function(error, result) {console.log(result, error); });
        // setTimeout(() => { 
        //     localStorage.setItem("uploaded",true);
        //     this.setState({isUploading:false,uploaded:true});
        //  }, 2000);

      }

    onFileUpload = async(event) => { 
        console.log(this.state);
        event.preventDefault();
        this.setState({isUploading:true});
       if (this.state.name!=""&&this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
        if(this.state.selectedFile===null){
            this.setState({isUploading:false,errorMessage:"You have not selected the Document."})
           }
        else{
            this.upload();
        }
       }
       else if(this.state.name===""){
        this.setState({isUploading:false,errorMessage:"Please Enter Your Name."})
       } 
       else if(!this.state.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
        this.setState({isUploading:false,errorMessage:"Invalid Email provided , Valid Email :- someone@something.com"})
       }
       else {
           this.setState({isUploading:false,errorMessage:"All fields are empty!!"})
       } 
       
        // Create an object of formData 
        // const formData = new FormData(); 
       
        // Update the formData object 
        // formData.append( 
        //   "myFile", 
        //   this.state.selectedFile, 
        //   this.state.selectedFile.name 
        // ); 
       
        // Details of the uploaded file 
        // console.log(this.state.selectedFile); 
       
        // Request made to the backend api 
        // Send formData object 
        // axios.post("api/uploadfile", formData); 
      }; 
    render(){
        
        return (
            <section className="contact-us" id="contact-us">
                {
                    !this.state.uploaded && <div className="comtainer bounceIn">
                    <div className="row">
                        <div className="col-md-10 offset-md-1">
                            <div className="section-title">
                                <h2>Form</h2>
                                <p>Upload pdf which is clearly visible </p>
                            </div>
                        </div>
                    </div>
                </div>
                }
       {
           !this.state.isUploading && !this.state.uploaded &&<div className="contact-us-form wow bounceIn">
           <div className="container">
           {
               this.state.errorMessage && <div class="alert alert-danger" role="alert" style={{}} >
               {this.state.errorMessage}
               </div>
           }
               <form role="form">
                   <div className="row">
                       <div className="col-md-12">
                           <input className="form-control" type="text" id="name" placeholder="Name *" onChange={(e)=>this.setState({name:e.target.value})}/>
                           <input className="form-control" type="text" id="email" placeholder="Email *" onChange={(e)=>this.setState({email:e.target.value})}/>
                           <input className="form-control" type="text" id="aemail" placeholder="Amity Student Email" onChange={(e)=>this.setState({aemail:e.target.value})}/>
                           Scaned Form <span style={{color:"red"}}>*</span>: &nbsp; <input type="file" onChange={this.onFileChange} style={{marginBottom:10}} accept="application/pdf" />
                           {
                               this.state.selectedFile && <div>
                                  <h2>File Details:</h2> 
                                   <p>File Name: {this.state.selectedFile.name}</p> 
                                   <p>File Type: {this.state.selectedFile.type}</p> 
                                   <p> 
                                   Last Modified:{" "} 
                                   {this.state.selectedFile.lastModifiedDate.toDateString()} 
                                   </p> 
                               </div>
                           }
                           <button type="submit" onClick={this.onFileUpload} className="btn btn-default submit-btn form_submit">SEND</button>

                           {/* <input className="form-control" type="text" id="subject" placeholder="Subect" /> */}
                       </div>
                       {/* <div className="col-md-8">
                           <textarea className="form-control" id="message" cols={10} rows={25} placeholder="Message Text..." defaultValue={""} />
                           <button type="submit" className="btn btn-default submit-btn form_submit">SEND</button>
                       </div> */}
                   </div>
               </form>
           </div>
           <div className="container">
               <div className="row">
                   <div className="col-md-12 wow bounceInLeft">
                       <div className="social-icons">
                           <ul>
                               <li><a href="#"><i className="fa fa-facebook" /></a></li>
                               <li><a href="#"><i className="fa fa-twitter" /></a></li>
                               <li><a href="#"><i className="fa fa-youtube-play" /></a></li>
                           </ul>
                       </div>
                   </div>
               </div>
           </div>
       </div>

       }
       {
           this.state.isUploading && !this.state.uploaded && <IsUploading />
       }
       {
           this.state.uploaded && !this.state.isUploading && <UploadSucess/>
       }
            </section>
    
        );

}
    
}

export default App;
