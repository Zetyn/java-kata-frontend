import React,{} from "react";
import AppNavbar from "./AppNavBar";
import {faCloudUpload, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const ProfileEdit = () => {

    return (
      <div>
          <AppNavbar />
          <div className="page">
              <div className="page__inner">
                  <div className="custom-container container-responsive container-offset">
                      <div className="paper section-body">
                          <div style={{marginBottom:"25px"}}>
                              <div className="uploader">
                                  <div className="uploader-title">Avatar</div>
                                  <div className="uploader-wrap">
                                      <label className="uploader-trigger">
                                          <div className="uploader-trigger__caption">
                                              <div className="uploader-trigger__icon">
                                                  <FontAwesomeIcon icon={faCloudUpload} />
                                              </div>
                                              <div>
                                                  Click or drag an image to upload
                                              </div>
                                          </div>
                                          <input type="file" hidden="true" accept="image/*"/>
                                      </label>
                                      <div className="uploader-preview">
                                          <div className="uploader-preview__img"></div>
                                          <button className="uploader-preview__remove">
                                              <FontAwesomeIcon icon={faTrash} />
                                          </button>
                                      </div>
                                  </div>
                              </div>
                              <form>
                                  <div className="form__field">
                                      <label className="form__label">First name</label>
                                      <input className="form__input" type="text"/>
                                  </div>
                                  <div className="form__field">
                                      <label className="form__label">Last name</label>
                                      <input className="form__input" type="text"/>
                                  </div>
                                  <div className="form__field">
                                      <label className="form__label">Email</label>
                                      <input className="form__input" type="text"/>
                                  </div>
                                  <div className="form__footer">
                                      <input className="button button_green" type="submit" value="Save"/>
                                  </div>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}

export default ProfileEdit;