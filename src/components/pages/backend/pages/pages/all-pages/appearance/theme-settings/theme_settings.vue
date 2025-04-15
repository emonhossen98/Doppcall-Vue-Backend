<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-md-12">
          <div class="card ">
            <div class="card-header ">
              <h5 class="card-title mb-0">Theme Setting</h5>
            </div>
            <div class="card-body mt-3">
              <form>
                <div class="row mb-3">
                 <div class="col-sm-2">
                    <label for="site_title">Site Title</label>
                 </div>
                 <div class="col-sm-10">
                    <input
                    v-model="themeSettings.site_title"
                    id="site_title"
                    class="form-control"
                    required
                  />
                 </div>
                </div>

                <div class="row mb-3">
                <div class="col-sm-2">
                    <label for="site_description">Site Description</label>
                </div>
                <div class="col-sm-10">
                    <textarea
                    v-model="themeSettings.site_description"
                    id="site_description"
                    class="form-control"
                  ></textarea>
                </div>
                </div>

                <div class="row">
                  <div class="col-md-12 mb-3">
                    <div class="row align-items-center">
                      <div class="col-sm-2">
                        <label for="theme_logo">Primary Logo</label>
                      </div>
                      <div class="row col-sm-10 mb-1">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="primaryLogo($event)" class="form-control" id="theme_logo"> 
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="themeShowImage.theme_logo" :src="themeShowImage.theme_logo" class="imgpreview">
                      </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <div class="row align-items-center">
                      <div class="col-sm-2">
                        <label for="secoundary_logo">Secondary Logo</label>
                      </div>
                      <div class="row col-sm-10 mb-1">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="secoundaryLogo($event)" class="form-control" id="secoundary_logo">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="themeShowImage.secoundary_logo" :src="themeShowImage.secoundary_logo" class="imgpreview bg-dark">
                      </div>
                      </div>
                    </div>
                  </div> 

                   <div class="col-md-12 mb-3">
                    <div class="row align-items-center">
                      <div class="col-sm-2">
                        <label for="footer_logo">Footer Logo</label>
                      </div>
                      <div class="row col-sm-10 mb-1">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="footerLogo($event)" class="form-control" id="footer_logo">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="themeShowImage.footer_logo" :src="themeShowImage.footer_logo" class="imgpreview">
                      </div>
                      </div>
                    </div>
                  </div> 

                  <div class="col-md-12 mb-3">
                    <div class="row align-items-center">
                      <div class="col-sm-2">
                        <label for="favicon">Favicon</label>
                      </div>
                      <div class="row col-sm-10 mb-0">
                        <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="favicon($event)" class="form-control" id="favicon">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="themeShowImage.favicon" :src="themeShowImage.favicon" class="imgpreview">
                      </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row   mb-3">
                    <div class="col-sm-2">
                        <label for="address">Address</label>
                    </div>
                    <div class="col-sm-10">
                        <textarea ref="themAddress"  id="address" rows="10" class="form-control" > </textarea>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-2">
                        <label for="email">Email</label>
                    </div>
                    <div class="col-sm-10">
                        <input v-model="themeSettings.email" id="email" class="form-control" />
                    </div>
                </div>

                <div class="row mb-3 ">
                    <div class="col-sm-2">
                        <label for="phone">Phone</label>
                    </div>
                    <div class="col-sm-10">
                        <input v-model="themeSettings.phone" id="phone" class="form-control" />
                    </div>
                </div>

                <div class="row mb-3 ">
                    <div class="col-sm-2">
                        <label for="footer_description">Footer Description</label>
                    </div>
                    <div class="col-sm-10">
                        <textarea v-model="themeSettings.footer_description" id="footer_description" placeholder="footer description" rows="3" class="form-control" > </textarea>
                        <span>Description max 180 characters</span>
                    </div>
                </div>

                <div class="row mb-3 ">
                    <div class="col-sm-2">
                        <label for="copy_right">Copyright</label>
                    </div>
                    <div class="col-sm-10">
                        <input v-model="themeSettings.copy_right" id="copy_right" class="form-control" />
                    </div>
                </div>

                <div class="row mb-3 ">
               <div class="col-sm-2">
                <label for="time_zone">Time Zone</label>
               </div>
               <div class="col-sm-10">
                <select class="form-select" id="time_zone" v-model="themeSettings.time_zone">
                    <option value="">Select Timezone</option>
                    <option v-for="zone in zones_array" :value="zone.zone" :key="zone.id" >
                          {{ zone.zone }}
                        </option>
                </select>
               </div>
                </div>

                <div class="row mb3 ">
                    <div class="row mb-2">
                    <div class="col-sm-2">
                        <label for="professional_agency">Professional Agency</label>
                    </div>
                    <div class="col-sm-10">
                        <input v-model="themeSettings.professional_agency" id="professional_agency" class="form-control" />
                    </div>
                </div>
                </div>

                <div class="row mb3 ">
                    <div class="row mb-2">
                    <div class="col-sm-2">
                        <label for="publisher_campaign_create_rules">Publisher Campaign Create Rules</label>
                    </div>
                    <div class="col-sm-10">
                        <textarea placeholder="Enter Your Publisher Campaign Create Rules" v-model="themeSettings.publisher_campaign_create_rules" id="publisher_campaign_create_rules" class="form-control"></textarea>
                    </div>
                </div>
                </div>

                <div class="form-group mt-3 text-end">
                  <button type="button" @click="themeSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header ">
              <h5 class="card-title mb-0">Hero Section</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-4">
                    <div class="col-sm-2">
                        <label for="hero_title">Hero Title</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" v-model="homeSection.hero_title" id="hero_title" class="form-control">
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-sm-2">
                        <label for="subtitle">Subtitle</label>
                    </div>
                    <div class="col-sm-10">
                    <textarea v-model="homeSection.subtitle" cols="10" rows="3" class="form-control" id="subtitle"></textarea>
                    </div>
                </div>

                <div class="my-3">
                  <div class="row mb-3">
                    <div class="col-sm-2">
                        <label for="button_text_one">Button One Text</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" v-model="homeSection.button_text_one" id="button_text_one" class="form-control">
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-sm-2">
                        <label for="button_text_one_url">Button One URL</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" v-model="homeSection.button_text_one_url" id="button_text_one_url" class="form-control">
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                        <label for="button_text_two">Button Two Text</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" v-model="homeSection.button_text_two" id="button_text_two" class="form-control">
                    </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                        <label for="button_text_two_url">Button Two URL</label>
                    </div>
                    <div class="col-sm-10">
                        <input type="text" v-model="homeSection.button_text_two_url" id="button_text_two_url" class="form-control">
                    </div>
                </div>

                <div class="col-md-12 mb-3">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="hero_logo">Hero Section Image</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="heroLogo($event)" class="form-control" id="hero_logo">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="heroShowImage.hero_logo" :src="heroShowImage.hero_logo" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group text-end">
                  <button type="button" @click="homeSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card  mt-4">
            <div class="card-header ">
              <h5 class="card-title mb-0">Why Choose Section</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-4">
                  <div class="col-sm-2">
                  <label for="title">Title</label>
                  </div>
                  <div class="col-sm-10">
                  <input type="text" v-model="whyChoose.title" id="title" class="form-control">
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="why_short_title">Subtitle</label>
                  </div>
                  <div class="col-sm-10">
                  <textarea rows="3" cols="10" ref="whyChooseShortTitle" class="form-control" id="why_short_title"></textarea>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="why_choose_pro_agency_title">Why Choose Profession Agency Title</label>
                  </div>
                  <div class="col-sm-10">
                  <input type="text" v-model="whyChoose.why_choose_pro_agency_title" id="why_choose_pro_agency_title" class="form-control">
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="why_choose_pro_agency_desc">Why Choose Professional Agency Description</label>
                  </div>
                  <div class="col-sm-10">
                  <textarea rows="3" cols="10" class="form-control" id="why_choose_pro_agency_desc" v-model="whyChoose.why_choose_pro_agency_desc"></textarea>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="why_choose_solution_title">Why Choose Solution Title</label>
                  </div>
                  <div class="col-sm-10">
                  <input type="text" v-model="whyChoose.why_choose_solution_title" id="why_choose_solution_title" class="form-control">
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="why_choose_solution_desc">Why Choose Solution Description</label>
                  </div>
                  <div class="col-sm-10">
                  <textarea rows="3" cols="10" class="form-control" id="why_choose_solution_desc" v-model="whyChoose.why_choose_solution_desc"></textarea>
                  </div>
                </div>

                <div class="col-md-12 mb-3">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="why_img">Why Us Banner</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="whyChooseLogo($event)" class="form-control" id="why_img">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="whyChooseShowImage.why_logo" :src="whyChooseShowImage.why_logo" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group text-end">
                  <button type="button" @click="whyChooseSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card mt-4">
            <div class="card-header">
              <h5 class="card-title  mb-0">Social Media</h5>
            </div>
            <div class="card-body">
              <form action="" method="POST">
                <div class="row mb-3 mt-2">
                  <div class="col-sm-2">
                    <label for="facebook">Facebook</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.facebook" class="form-control" id="facebook" placeholder="facebook url"/>
                    <span class="text-warning">Valid Facebook URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="twitter">Twitter</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.twitter" class="form-control" id="twitter" placeholder="twitter url"/>
                    <span class="text-warning">Valid Twitter URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="linkedin">LinkedIn</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.linkedin" class="form-control" id="linkedin" placeholder="linkedin url"/>
                    <span class="text-warning">Valid LinkedIn URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="instagram">Instagram</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.instagram" class="form-control" id="instagram" placeholder="instagram url"/>
                    <span class="text-warning">Valid Instagram URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="youtube">YouTube</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.youtube" class="form-control" id="youtube" placeholder="youtube url"/>
                    <span class="text-warning">Valid YouTube URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="whatsapp">WhatsApp</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.whatsapp" class="form-control" id="whatsapp" placeholder="whatsapp url"/>
                    <span class="text-warning">Valid WhatsApp URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="tiktok">TikTok</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.tiktok" class="form-control" id="tiktok" placeholder="tiktok url"/>
                    <span class="text-warning">Valid TikTok URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="telegram">Telegram</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.telegram" class="form-control" id="telegram" placeholder="telegram url"/>
                    <span class="text-warning">Valid Telegram URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="pinterest">Pinterest</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.pinterest" class="form-control" id="pinterest" placeholder="pinterest url"/>
                    <span class="text-warning">Valid Pinterest URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="reddit">Reddit</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.reddit" class="form-control" id="reddit" placeholder="reddit url"/>
                    <span class="text-warning">Valid Reddit URL</span>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="quora">Quora</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="socalMedia.quora" class="form-control" id="quora" placeholder="quora url"/>
                    <span class="text-warning">Valid Quora URL</span>
                  </div>
                </div>

                <div class="form-group text-end">
                  <button type="button" @click="socalMedisSave" class="btn  btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- {{-- Contact area --}} -->
          <div class="card card- mt-4">
            <div class="card-header">
              <h5 class="card-title mb-0">Contact Section</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-4">
                  <div class="col-sm-2">
                    <label for="con_address">Contact Address</label>
                  </div>
                  <div class="col-sm-10">
                    <textarea rows="5" cols="3" class="form-control" v-model="contactSection.con_address" id="con_address"></textarea>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="con_cell">Phone</label>
                  </div>
                  <div class="col-sm-10">
                    <textarea rows="5" cols="3" class="form-control" v-model="contactSection.con_cell" id="con_cell"></textarea>
                  </div>
                </div>

                <div class="my-3">
                  <div class="row mb-3">
                    <div class="col-sm-2">
                      <label for="con_email">Contact Email</label>
                    </div>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" v-model="contactSection.con_email" id="con_email"/>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-sm-2">
                      <label for="con_map_link">Contact Map Link</label>
                    </div>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" v-model="contactSection.con_map_link" id="con_map_link"/>
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                      <label for="con_title">Contact Title</label>
                    </div>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" v-model="contactSection.con_title" id="con_title"/>
                    </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                      <label for="con_short_title">Contact Short Title</label>
                    </div>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" v-model="contactSection.con_short_title" id="con_short_title"/>
                    </div>
                </div>

                <div class="col-md-12 mb-3">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="">Contact Image</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="contactSectionLogo($event)" class="form-control" id="contact_logo">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="contactImageShow.contact_logo" :src="contactImageShow.contact_logo" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group text-end">
                  <button type="button" @click="contactSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- {{-- FAQ area --}} -->
          <div class="card  mt-4">
            <div class="card-header ">
              <h5 class="card-title">FAQ Section</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-0">
                  <div class="col-sm-2">
                    <label for="feq_title mb-0">FAQ Title</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="faqSection.feq_title" id="feq_title" class="form-control">
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-sm-2">
                    <label for="feq_short_title">FAQ Short Title</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="faqSection.feq_short_title" id="feq_short_title" class="form-control">
                  </div>
                </div>
                <div class="col-md-12 mb-0">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="home_logo">FAQ Home Image</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="faqHomeImages($event)" class="form-control" id="home_logo">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="faqImageShow.home_logo" :src="faqImageShow.home_logo" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12 mb-0">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="">FAQ Single Image</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="faqSingleImages($event)" class="form-control" id="single_logo">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="faqImageShow.single_logo" :src="faqImageShow.single_logo" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group text-end">
                  <button type="button" @click="faqSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- {{-- Subscription area --}} -->
          <div class="card  mt-4">
            <div class="card-header ">
              <h5 class="card-title">Subscription</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-0">
                  <div class="col-sm-2">
                    <label for="subscription_title">Subscription Title</label>
                  </div>
                  <div class="col-sm-10">
                    <input type="text" v-model="subscriptionSection.subscription_title" id="subscription_title" class="form-control">
                  </div>
                </div>
                <div class="col-md-12 mb-3">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="">Subscription Image</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="subcriptionImage($event)" class="form-control" id="subscription_image">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="subscriptionImageShow.subscription_image" :src="subscriptionImageShow.subscription_image" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group text-end">
                  <button type="button" @click="subcriptionSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- {{-- about DOPPCALL area --}} -->
          <div class="card mt-4">
            <div class="card-header ">
              <h5 class="card-title">About DOPPCALL</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-2">
                  <div class="col-sm-2">
                  <label for="about_dropcall_title">About DOPPCALL Title</label>
                  </div>
                  <div class="col-sm-10">
                  <input type="text" v-model="aboutSection.about_dropcall_title" id="about_dropcall_title" class="form-control">
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="about_dropcall_text">About DOPPCALL Text</label>
                  </div>
                  <div class="col-sm-10">
                  <textarea rows="10" ref="aboutDoppcallText" cols="3" class="form-control"  id="about_dropcall_text"></textarea>
                  </div>
                </div>
                <div class="col-md-12 mb-3">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="">About DOPPCALL Image</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="aboutImage($event)" class="form-control" id="about_dropcall_image">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="aboutImageShoe.about_dropcall_image" :src="aboutImageShoe.about_dropcall_image" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group text-end">
                  <button type="button" @click="aboutSave" class="btn  btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- {{-- about Differentiates area --}} -->
          <div class="card  mt-4">
            <div class="card-header ">
              <h5 class="card-title">Differentiates DOPPCALL</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-2">
                  <div class="col-sm-2">
                  <label for="differentiates_title">Differentiates Title</label>
                  </div>
                  <div class="col-sm-10">
                  <input type="text" v-model="differentiatesSection.differentiates_title" id="differentiates_title" class="form-control">
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="differentiates_text">Differentiates Text</label>
                  </div>
                  <div class="col-sm-10">
                  <textarea rows="10" cols="3" class="form-control" v-model="differentiatesSection.differentiates_text" id="differentiates_text"></textarea>
                  </div>
                </div>
                <div class="form-group text-end">
                  <button type="button" @click="differentiatesSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- {{-- About Call Marketing area --}} -->
          <div class="card mt-4">
            <div class="card-header ">
              <h5 class="card-title">About Call Marketing</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-2">
                  <div class="col-sm-2">
                  <label for="marketing_title">About marketing Title</label>
                  </div>
                  <div class="col-sm-10">
                  <input type="text" v-model="aboutCallMarketing.marketing_title" id="marketing_title" class="form-control">
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="marketing_text">About Marketing Text</label>
                  </div>
                  <div class="col-sm-10">
                  <textarea rows="10" cols="3" ref="aboutCallMarketingText" class="form-control"  id="marketing_text"></textarea>
                  </div>
                </div>
                <div class="col-md-12 mb-3">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="">About Marketing Image</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="aboutCallMarketingImage($event)" class="form-control" id="marketing_image">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="aboutCallShowImage.marketing_image" :src="aboutCallShowImage.marketing_image" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group text-end">
                  <button type="button" @click="aboutCallMerketingSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- {{-- Home Page --}} -->
          <div class="card  mt-4">
            <div class="card-header">
              <h5 class="card-title">Home Call Marketing</h5>
            </div>
            <div class="card-body">
              <form>
                <div class="row mb-3 mt-2">
                  <div class="col-sm-2">
                  <label for="home_marketing_title">Title</label>
                  </div>
                  <div class="col-sm-10">
                  <input type="text" v-model="homeCallMarketing.title" id="home_marketing_title" class="form-control">
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-sm-2">
                  <label for="description">Description</label>
                  </div>
                  <div class="col-sm-10">
                  <textarea rows="10" cols="3" ref="homeCallMarketingDescription" class="form-control" id="description"></textarea>
                  </div>
                </div>

                <div class="col-md-12 mb-3">
                  <div class="row align-items-center">
                    <div class="col-sm-2">
                      <label for="">Home Marketing Image</label>
                    </div>
                    <div class="row col-sm-10">
                      <div class="col-sm-6">
                        <input type="file" accept="image/*" ref="myFile" @change="homeCallMarketingImage($event)" class="form-control" id="home_marketing_side_image">
                        <span style="background: #e9fff7; font-size: 12px; cursor: help;"
                            class="py-1 px-2 d-block">Valid image:
                            jpg,png,svg,jpeg</span>
                      </div>
                      <div class="col-sm-6">
                        <img v-if="homeCallShowImage.image" :src="homeCallShowImage.image" class="largeImage">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-group text-end">
                  <button type="button" @click="homeCallMerketingSave" class="btn btn-primary btn-sm">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- {{-- Press Release --}} -->
          <div class="card mt-4">
            <div class="card-header">
                <h4 class="card-title">Press Release</h4>
            </div>
            <div class="card-body">
                <div>
                    <div class="row mb-3">
                       <div class="col-md-2">
                        <label for="press_release_f_about">Press Release First About</label>
                       </div>
                       <div class="col-md-10">
                        <textarea v-model="pressRelease.press_release_f_about" rows="10" cols="80" class="form-control" id="press_release_f_about"></textarea>
                       </div>
                    </div>

                    <div class="row mb-3">
                      <div class="col-md-2">
                        <label for="press_release_s_about">Press Release Second About</label>
                       </div>
                       <div class="col-md-10">
                        <textarea v-model="pressRelease.press_release_s_about" rows="10" cols="80" class="form-control" id="press_release_s_about"></textarea>
                       </div>
                    </div>
                    <div class="form-group text-end">
                        <button type="button" @click="pressReleaseSave()" class="btn btn-sm btn-primary">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
    <!-- / Content -->
    <div class="content-backdrop fade"></div>
  </div>
  <!-- Content wrapper -->
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import Loader from "../../../../../include/loader.vue";
import Breadcrumb from "../../../../../include/breadcrumb.vue";
import { inject } from "vue";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Loader,
    Breadcrumb,
  },
    data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Appearance", url: "" },
        { label: "Theme Settings", url: "" },
      ],
      getLoader: false,
      zones_array : {},
      timezone : "", 
      themeSettings: {
        site_title : "",
        site_description : "",
        theme_logo : "",
        secoundary_logo : "",
        footer_logo : "",
        favicon : "",
        address : "",
        email : "",
        phone : "",
        footer_description : "",
        copy_right : "",
        time_zone : "",
        professional_agency : "",
        publisher_campaign_create_rules : "",
       },
       themeShowImage : {
        theme_logo : "", 
        secoundary_logo : "",
        footer_logo : "",
        favicon : "",
       },
       homeSection : {
        hero_title : "",
        subtitle : "",
        button_text_one: "",
        button_text_one_url : "",
        button_text_two : "",
        button_text_two_url : "",
        hero_logo : "",
       },
       heroShowImage : {
        hero_logo : "",
       },
       whyChoose : {
        title : "" ,
        why_short_title : "" ,
        why_choose_pro_agency_title : "" ,
        why_choose_pro_agency_desc : "" ,
        why_choose_solution_title : "" ,
        why_choose_solution_desc : "" ,
        why_logo : "",
       },
       whyChooseShowImage : {
        why_logo : "",
       },
       socalMedia: {
        facebook : "",
        twitter : "",
        linkedin : "",
        instagram : "",
        youtube : "",
        whatsapp : "",
        tiktok : "",
        telegram : "",
        pinterest : "",
        reddit : "",
        quora : "",
       },
       contactSection:{
        con_address  : "",
        con_cell : "",
        con_email : "",
        con_map_link : "",
        con_title : "",
        con_short_title : "",
        contact_logo : null,
       },
       contactImageShow:{
        contact_logo : null,
       },
       faqSection : {
        feq_title : "",
        feq_short_title : "",
        home_logo : null,
        single_logo : null,
       },
       faqImageShow:{
        home_logo : null,
        single_logo : null,
       },
       subscriptionSection :{
        subscription_title : "",
        subscription_image : null,
       },
       subscriptionImageShow:{
        subscription_image : null
       },
       aboutSection : {
        about_dropcall_title  : "",
        about_dropcall_text : "",
        about_dropcall_image : null,
       },
       aboutImageShoe : {
        about_dropcall_image : null,
       },
       differentiatesSection: {
        differentiates_title : "",
        differentiates_text : "",
       },
       aboutCallMarketing : {
        marketing_title  : "",
        marketing_text : "",
        marketing_image : null,
       },
       aboutCallShowImage : {
        marketing_image : null,
       },
       homeCallMarketing: {
        title : "",
        description : "",
        image : null,
       },
       homeCallShowImage : {
        image : null,
       },
       pressRelease : {
        press_release_f_about : "",
        press_release_s_about : "",
       },
     };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        import("https://cdn.jsdelivr.net/npm/summernote/dist/summernote-lite.min.css");
        import("https://cdn.jsdelivr.net/npm/summernote/dist/summernote-lite.min.js");
          this.getThemeData();
          $(this.$refs.themAddress).summernote({
              placeholder: 'Type your text here...',
              height: 200,
              callbacks: {
                onChange: contents => {
                this.themeSettings.address = contents;
                }
              }
          });
          $(this.$refs.whyChooseShortTitle).summernote({
              placeholder: 'Type your text here...',
              height: 200,
              callbacks: {
                onChange: contents => {
                this.whyChoose.why_short_title = contents;
                }
              }
          });
          $(this.$refs.aboutDoppcallText).summernote({
              placeholder: 'Type your text here...',
              height: 200,
              callbacks: {
                onChange: contents => {
                this.aboutSection.about_dropcall_text = contents;
                }
              }
          });
          $(this.$refs.aboutCallMarketingText).summernote({
              placeholder: 'Type your text here...',
              height: 200,
              callbacks: {
                onChange: contents => {
                this.aboutCallMarketing.marketing_text = contents;
                }
              }
          });
          $(this.$refs.homeCallMarketingDescription).summernote({
              placeholder: 'Type your text here...',
              height: 200,
              callbacks: {
                onChange: contents => {
                this.homeCallMarketing.description = contents;
                }
              }
          });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    themeSave(){
      this.getLoader =  true;
      axios.post(this.globalVariables.apiUrl+"admin/appearance/theme-settings/store", this.themeSettings, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    homeSave(){
      this.getLoader =  true;
      axios.post(this.globalVariables.apiUrl+"admin/appearance/herosetion", this.homeSection, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    whyChooseSave(){
      this.getLoader = true;
     axios.post(this.globalVariables.apiUrl+"admin/appearance/whyus", this.whyChoose, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    socalMedisSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/social-media", this.socalMedia, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    contactSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/contact", this.contactSection, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    faqSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/faq", this.faqSection, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    subcriptionSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/subscription", this.subscriptionSection, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    aboutSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/about-dropcall", this.aboutSection, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    differentiatesSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/differentiates", this.differentiatesSection, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    aboutCallMerketingSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/callarea", this.aboutCallMarketing, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    homeCallMerketingSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/home-merketing/store", this.homeCallMarketing, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },
    pressReleaseSave(){
      this.getLoader = true;
    axios.post(this.globalVariables.apiUrl+"admin/appearance/press-about/store ", this.pressRelease, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toastr.success(res.data.message);
          this.getThemeData();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },

    getThemeData() {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/appearance/theme-settings', { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then((res) => {
          this.zones_array = res.data.zones_array;
          this.timezone = res.data.timezone;
          this.themeSettings.site_title  = res.data.site_title,
          this.themeSettings.site_description  = res.data.site_description,
          this.themeShowImage.theme_logo  = res.data.theme_logo,
          this.themeShowImage.secoundary_logo  = res.data.secoundary_logo,
          this.themeShowImage.footer_logo  = res.data.footer_logo,
          this.themeShowImage.favicon  = res.data.favicon,
          this.themeSettings.address  = res.data.address,
          this.themeSettings.email  = res.data.email,
          this.themeSettings.phone  = res.data.phone,
          this.themeSettings.footer_description  = res.data.footer_description,
          this.themeSettings.copy_right  = res.data.copyright  ,
          this.themeSettings.time_zone  = res.data.timezone,
          this.themeSettings.professional_agency = res.data.professional_agency;
          this.themeSettings.publisher_campaign_create_rules = res.data.publisher_campaign_create_rules;
          $(this.$refs.themAddress).summernote('code', res.data.address ?? '');

          //   Home Section 
          this.homeSection.hero_title = res.data.title;
          this.homeSection.subtitle = res.data.short_title;
          this.homeSection.button_text_one = res.data.button_one_text;
          this.homeSection.button_text_one_url = res.data.button_one_url;
          this.homeSection.button_text_two = res.data.button_two_text;
          this.homeSection.button_text_two_url = res.data.button_two_url;
          this.heroShowImage.hero_logo = res.data.hero_logo;

          // Why Choose Section 
          this.whyChoose.title = res.data.why_title;
          this.whyChoose.why_short_title = res.data.why_short_title ,
          this.whyChoose.why_choose_pro_agency_title = res.data. why_choose_pro_agency_title,
          this.whyChoose.why_choose_pro_agency_desc = res.data. why_choose_pro_agency_desc,
          this.whyChoose.why_choose_solution_title = res.data. why_choose_solution_title,
          this.whyChoose.why_choose_solution_desc = res.data. why_choose_solution_desc,
          this.whyChooseShowImage.why_logo = res.data.why_site_image;
          $(this.$refs.whyChooseShortTitle).summernote('code', res.data.why_short_title ?? '');

          // Socal  Section 
          this.socalMedia.facebook = res.data.facebook;
          this.socalMedia.twitter = res.data.twitter;
          this.socalMedia.linkedin = res.data.linkedin;
          this.socalMedia.instagram = res.data.instagram;
          this.socalMedia.youtube = res.data.youtube;
          this.socalMedia.whatsapp = res.data.whatsapp;
          this.socalMedia.tiktok = res.data.tiktok;
          this.socalMedia.telegram = res.data.telegram;
          this.socalMedia.pinterest = res.data.pinterest;
          this.socalMedia.reddit = res.data.reddit;
          this.socalMedia.quora = res.data.quora;
          
          // Contact Section
          this.contactSection.con_address = res.data.con_address;
          this.contactSection.con_cell = res.data.con_cell;
          this.contactSection.con_email = res.data.con_email;
          this.contactSection.con_map_link = res.data.con_map_link;
          this.contactSection.con_title = res.data.con_title;
          this.contactSection.con_short_title = res.data.con_short_title;
          this.contactImageShow.contact_logo = res.data.contact_logo;

          // Faq Section 
          this.faqSection.feq_title = res.data.feq_title;
          this.faqSection.feq_short_title =  res.data.feq_short_title;
          this.faqImageShow.home_logo = res.data.faqhomeimage;
          this.faqImageShow.single_logo = res.data.faqsingleimage;

          // Subcreption Section
          this.subscriptionSection.subscription_title = res.data.subscription_title;
          this.subscriptionImageShow.subscription_image = res.data.subscription_image;

          // About Section 
          this.aboutSection.about_dropcall_title = res.data.about_dropcall_title;
          this.aboutSection.about_dropcall_text = res.data.about_dropcall_text;
          this.aboutImageShoe.about_dropcall_image = res.data.about_dropcall_image;
          $(this.$refs.aboutDoppcallText).summernote('code', res.data.about_dropcall_text ?? '');

          // Differentiates Section 
          this.differentiatesSection.differentiates_title = res.data.differentiates_title; 
          this.differentiatesSection.differentiates_text = res.data.differentiates_text; 

          //About Call Merketing 
          this.aboutCallMarketing.marketing_title = res.data.marketing_title;
          this.aboutCallMarketing.marketing_text  = res.data.marketing_text;
          this.aboutCallShowImage.marketing_image = res.data.marketing_image;
          $(this.$refs.aboutCallMarketingText).summernote('code', res.data.marketing_text ?? '');

          //Home Call Merketing
          this.homeCallMarketing.title = res.data.home_marketing_title;
          this.homeCallMarketing.description = res.data.home_marketing_description;
          this.homeCallShowImage.image = res.data.home_marketing_side_image;
          $(this.$refs.homeCallMarketingDescription).summernote('code', res.data.home_marketing_description ?? '');

          // Press Release 
          this.pressRelease.press_release_f_about = res.data.press_release_f_about;
          this.pressRelease.press_release_s_about = res.data.press_release_s_about;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        })
    },
    
    primaryLogo(event) {
      const file = event.target.files[0];
      this.themeSettings.theme_logo = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.themeShowImage.theme_logo = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    secoundaryLogo(event) {
    const file = event.target.files[0];
    this.themeSettings.secoundary_logo = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.themeShowImage.secoundary_logo = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    footerLogo(event) {
        const file = event.target.files[0];
        this.themeSettings.footer_logo = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.themeShowImage.footer_logo = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    favicon(event) {
      const file = event.target.files[0];
      this.themeSettings.favicon = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.themeShowImage.favicon = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    heroLogo(event) {
      const file = event.target.files[0];
      this.homeSection.hero_logo = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.heroShowImage.hero_logo = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    whyChooseLogo(event) {
      const file = event.target.files[0];
      this.whyChoose.why_logo = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.whyChooseShowImage.why_logo = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    contactSectionLogo(event) {
      const file = event.target.files[0];
      this.contactSection.contact_logo = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.contactImageShow.contact_logo = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    faqHomeImages(event) {
      const file = event.target.files[0];
      this.faqSection.home_logo = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.faqImageShow.home_logo = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    faqSingleImages(event) {
      const file = event.target.files[0];
      this.faqSection.single_logo = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.faqImageShow.single_logo = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    subcriptionImage(event) {
      const file = event.target.files[0];
      this.subscriptionSection.subscription_image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.subscriptionImageShow.subscription_image = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    aboutImage(event) {
      const file = event.target.files[0];
      this.aboutSection.about_dropcall_image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.aboutImageShoe.about_dropcall_image = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    aboutCallMarketingImage(event) {
      const file = event.target.files[0];
      this.aboutCallMarketing.marketing_image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.aboutCallShowImage.marketing_image = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
    homeCallMarketingImage(event) {
      const file = event.target.files[0];
      this.homeCallMarketing.image = file;
      if (!file || file.type.indexOf('image/') === -1) return;
      const reader = new FileReader();
      reader.onload = () => {
        this.homeCallShowImage.image = reader.result; // Update imgsrc with filename
      };
      reader.readAsDataURL(file);
    },
  },
}
</script>

<style scoped>
.imgpreview {
	width: 15%;
}
.largeImage{
	width: 40%;
	border: 1px solid #d6cece;
}
</style>