import React, { Component } from "react";
import axios from "axios";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import { ButtonSubmit } from "../ui/Button";
import { validateFile } from "../../helpers/validation.js";

class UploadProfilePicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: "",
      url: ""
    };
  }

  handleChange = ev => {
    this.setState({ success: false, url: "" });
  };

  // Perform the upload
  handleUpload = ev => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split(".");
    console.log(file.size);
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    if (file.size / 1000 < 1000) {
      if(validateFile(fileType)){
        axios
          .post("/sign_s3", {
            fileName: fileName,
            fileType: fileType
          })
          .then(response => {
            var returnData = response.data.data.returnData;
            var signedRequest = returnData.signedRequest;
            var url = returnData.url;
            this.props.setProfilePicture(url);

            // Put the fileType in the headers for the upload
            var options = {
              headers: {
                "Content-Type": fileType
              }
            };
            axios
              .put(signedRequest, file, options)
              .then(result => {
                console.log("Response from s3");
                this.setState({ success: true, error: "" });
              })
              .catch(error => {
                alert("ERROR " + JSON.stringify(error));
              });
          })
          .catch(error => {
            alert(JSON.stringify(error));
          });
      } else {
        this.setState({error: "Image not proper file type: Must be .jpeg, .jpg, .png, or .gif"});
      }
    } else {
      this.setState({ error: "Image too Large: Maximum size of 1MB" });
    }
  };

  render() {
    const SuccessMessage = () => (
      <Box p="10px" color="green">
        Upload was Successful!
      </Box>
    );
    return (
      <Box>
        <Flex>
          <Box className="input-btn-wrapper">
            <input
              className="input-btn"
              onChange={this.handleChange}
              ref={ref => {
                this.uploadInput = ref;
              }}
              type="file"
            />
          </Box>
          <ButtonSubmit position="relative" onClick={this.handleUpload}>
            UPLOAD
          </ButtonSubmit>
        </Flex>
        {this.state.success ? <SuccessMessage /> : null}
        <Box mt="5px" color="red">
          {this.state.error}
        </Box>
      </Box>
    );
  }
}
export default UploadProfilePicture;
