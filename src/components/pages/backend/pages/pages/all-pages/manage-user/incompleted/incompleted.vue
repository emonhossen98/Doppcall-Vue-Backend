<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-3 pb-1">
              <h5 class="card-title mb-0">Incomplete Register Users</h5>
            </div>
            <div class="card-body">
              <table class="align-middle mb-0 table table-hover" :class="dataSteps == 1 ? 'dataTables_steps1' : 'dataTables_steps2'" id="incompletedusers">
                <thead>
                  <tr>
                    <!-- <th></th> -->
                    <th></th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">User Type</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">First Name</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Last Name</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Email</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Phone</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Country</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Company Name</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Company Website</th>
                    <th :class="dataSteps == 2 ? 'd-none' : ''">Created At</th>
                    <th class="d-none">Address</th>
                    <th class="d-none">City</th>
                    <th class="d-none">State</th>
                    <th class="d-none">Zip Code</th>
                    <th class="d-none">Country</th>
                    <th class="d-none">Skype Id</th>
                    <th class="d-none">Linkedin Id</th>
                    <th id="action-incompleted" :class="dataSteps == 2 ? 'd-none' : ''">Action</th>

                    <th :class="dataSteps == 1 ? 'd-none' : ''">User Type</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Address</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">City</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">State</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Zip Code</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Country</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Skype Id</th>
                    <th :class="dataSteps == 1 ? 'd-none' : ''">Linkedin Id</th>
                    <th id="action-incompleted" :class="dataSteps == 1 ? 'd-none' : ''">Action</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
              <div id="externalFilters" v-if="showHiddenExternalFilter">
                  <div>
                    <div class="row">
                      <div class="d-flex justify-content-between align-items-center border-bottom py-3 px-4">
                        <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template></h5>
                        <a class="clearallexternalfilter" @click="externalfilterreset()">Clear All</a>
                      </div>
                    </div>
                    <div class="row px-3" id="externalFiltersWrapper">
                      <div class="col-md-6 border-right">
                        <ul class="px-0 mt-3" id="offer-extra-filter">
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'First Name' ? 'check-active' : ''"
                              @click="clickFilters('fname', 'search', 'First Name')">First Name 
                            </a>
                            <template v-if="applyfillters.includes('First Name')">
                              <span @click="removeSearch('First Name','fname','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Last Name' ? 'check-active' : ''"
                              @click="clickFilters('lname', 'search', 'Last Name')">Last Name 
                            </a>
                            <template v-if="applyfillters.includes('Last Name')">
                              <span @click="removeSearch('Last Name','lname','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Email' ? 'check-active' : ''"
                              @click="clickFilters('email', 'search', 'Email')">Email 
                            </a>
                            <template v-if="applyfillters.includes('Email')">
                              <span @click="removeSearch('Email','email','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Role' ? 'check-active' : ''"
                              @click="clickFilters('user_type', 'select', 'Role')">Role <i class="fa-solid fa-caret-down"></i>
                            </a>
                            <template v-if="applyfillters.includes('Role')">
                              <span @click="removeSearch('Role','user_type','select')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Phone Number' ? 'check-active' : ''"
                              @click="clickFilters('phone_no ', 'search', 'Phone Number')">Phone Number 
                            </a>
                            <template v-if="applyfillters.includes('Phone Number')">
                              <span @click="removeSearch('Phone Number','phone_no ','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Company Name' ? 'check-active' : ''"
                              @click="clickFilters('company_name ', 'search', 'Company Name')">Company Name 
                            </a>
                            <template v-if="applyfillters.includes('Company Name')">
                              <span @click="removeSearch('Company Name','company_name ','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Company Website' ? 'check-active' : ''"
                              @click="clickFilters('company_website', 'search', 'Company Website')">Company Website 
                            </a>
                            <template v-if="applyfillters.includes('Company Website')">
                              <span @click="removeSearch('Company Website','company_website','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Country Code' ? 'check-active' : ''"
                              @click="clickFilters('country_code', 'search', 'Country Code')">Country Code 
                            </a>
                            <template v-if="applyfillters.includes('Country Code')">
                              <span @click="removeSearch('Country Code','country_code','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Country' ? 'check-active' : ''"
                              @click="clickFilters('country', 'search', 'Country')">Country 
                            </a>
                            <template v-if="applyfillters.includes('Country')">
                              <span @click="removeSearch('Country','country','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Browser' ? 'check-active' : ''"
                              @click="clickFilters('browser', 'search', 'Browser')">Browser 
                            </a>
                            <template v-if="applyfillters.includes('Browser')">
                              <span @click="removeSearch('Browser','browser','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'OS' ? 'check-active' : ''"
                              @click="clickFilters('os', 'search', 'OS')">OS 
                            </a>
                            <template v-if="applyfillters.includes('OS')">
                              <span @click="removeSearch('OS','os','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Skype' ? 'check-active' : ''"
                              @click="clickFilters('skype_id', 'search', 'Skype')">Skype 
                            </a>
                            <template v-if="applyfillters.includes('Skype')">
                              <span @click="removeSearch('Skype','skype_id','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Telegram' ? 'check-active' : ''"
                              @click="clickFilters('linkedin_id', 'search', 'Telegram')">Telegram 
                            </a>
                            <template v-if="applyfillters.includes('Telegram')">
                              <span @click="removeSearch('Telegram','linkedin_id','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Facebook' ? 'check-active' : ''"
                              @click="clickFilters('facebook_id', 'search', 'Facebook')">Facebook 
                            </a>
                            <template v-if="applyfillters.includes('Facebook')">
                              <span @click="removeSearch('Facebook','facebook_id','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Created At' ? 'check-active' : ''"
                              @click="clickFilters('created_at', 'search', 'Created At')">Created At 
                            </a>
                            <template v-if="applyfillters.includes('Created At')">
                              <span @click="removeSearch('Created At','created_at','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6 ps-4">
                        <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                          <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                          <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['fname']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['fname']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['lname']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['lname']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['email']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['email']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['user_type']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['user_type']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['phone_no']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['phone_no']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_name']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['company_name']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Company Website' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_website']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['company_website']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Country Code' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['country_code']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['country_code']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['country']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['country']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Browser' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['browser']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['browser']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'OS' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['os']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['os']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Skype' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['skype_id']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['skype_id']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Telegram' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['linkedin_id']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['linkedin_id']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Facebook' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['facebook_id']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['facebook_id']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['created_at']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['created_at']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <div>
                            <p>Have value</p>
                            <div>
                              <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['fname']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['lname']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['email']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')">
                              <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['user_type']" class="form-check-input" type="checkbox" value="publisher-register" id="dynamicidstatus0">
                                  <label class="form-check-label" for="dynamicidstatus0">
                                    Publisher
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['user_type']" class="form-check-input" type="checkbox" value="advertiser-register" id="dynamicidstatus1">
                                  <label class="form-check-label" for="dynamicidstatus1">
                                    Advertiser
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['phone_no']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_name']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Company Website' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_website']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Country Code' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['country_code']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['country']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Browser' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['browser']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'OS' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['os']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Skype' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['skype_id']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Telegram' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['linkedin_id']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Facebook' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['facebook_id']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>  
                              <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['created_at']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div class="row justify-content-between align-items-center">
                <div class="col-md-3">
                  Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                </div>
                <div
                  class="pagination-controls col-md-9 d-flex justify-content-end align-items-center"
                >
                  <ul class="pagination mb-0">
                    <!-- Previous Button -->
                    <li
                      class="paginate_button page-item previous"
                      :class="{ disabled: currentPage === 1 }"
                    >
                      <button
                        class="page-link"
                        @click="getUserTrashs(currentPage - 1)"
                        :disabled="currentPage === 1"
                      >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li
                        class="paginate_button page-item"
                        :class="{ active: page === currentPage }"
                      >
                        <button class="page-link" @click="getUserTrashs(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li
                      class="paginate_button page-item next"
                      :class="{ disabled: currentPage === lastPage }"
                    >
                      <button
                        class="page-link"
                        @click="getUserTrashs(currentPage + 1)"
                        :disabled="currentPage === lastPage"
                      >
                        <i class="fa-solid fa-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Large Modal -->
    <div class="modal fade" id="contactInfoShow" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel3">
              Incomplete Register Details
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="card card-body border-0 p-0 table-responsive table-overflow-hidden">
              <table class="table table-sm table-hover table-bordered">
                <tr>
                  <td class="font-weight-bold w-25">First Name :</td>
                  <td id="f-name"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Last Name :</td>
                  <td id="l-name"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">E-mail :</td>
                  <td id="email"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Phone Number :</td>
                  <td id="phone-number"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Country Code :</td>
                  <td id="country_code"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Company Name :</td>
                  <td id="company_name"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Company Website :</td>
                  <td id="company_website"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Address :</td>
                  <td id="address"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">City :</td>
                  <td id="city"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">State :</td>
                  <td id="state"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Zip Code :</td>
                  <td id="zip_code"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Country :</td>
                  <td id="country"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Skype Id :</td>
                  <td id="skype_id"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Linkedin Id :</td>
                  <td id="linkedin_id"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Facebook Id :</td>
                  <td id="facebook_id"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Ip Address :</td>
                  <td id="ip_address"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">User Agent :</td>
                  <td id="user_agent"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Browser :</td>
                  <td id="browser"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">OS :</td>
                  <td id="os"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">Step :</td>
                  <td id="step"></td>
                </tr>
                <tr>
                  <td class="font-weight-bold">User Type :</td>
                  <td id="user_type"></td>
                </tr>
              </table>
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
import { format } from "date-fns";
import { fetchUserRole } from "@/services/userService";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  props : ['roles'],
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Incomplete Register Users ", url: "" },
      ],
      getLoader: false,
      currentPage: 1,
      lastPage: 1,
      recordsTotal: 0,
      startPage: 0,
      endPage: 0,
      searchInputValue: "",
      dataSteps: 1,
      bulkactionids : {
        selectedIds: [],
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['fname'],
        showcolumn: "First Name",
        types : ['search'],
        emptyValues : {
          fname : [],
          lname : [],
          slug : [],
          email : [],
          user_type : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          country_code : [],
          country : [],
          browser : [],
          os : [],
          skype_id : [],
          linkedin_id : [],
          facebook_id : [],
          created_at : [],
        },
        notemptyValues : {
          fname : [],
          lname : [],
          slug : [],
          email : [],
          user_type : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          country_code : [],
          country : [],
          browser : [],
          os : [],
          skype_id : [],
          linkedin_id : [],
          facebook_id : [],
          created_at : [],
        },
        searchValues : {
          fname : [],
          lname : [],
          slug : [],
          email : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          country_code : [],
          country : [],
          browser : [],
          os : [],
          skype_id : [],
          linkedin_id : [],
          facebook_id : [],
          created_at : [],
        },
        selectedValues: {
          user_type : [],
        },
      },
      applyfillters : [],
    };
  },
  computed: {
    paginationPages() {
      const pages = [];
      const range = 2;
      const start = Math.max(1, this.currentPage - range);
      const end = Math.min(this.lastPage, this.currentPage + range);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (start > 1) {
        pages.unshift(1);
        if (start > 2) pages.splice(1, 0, "...");
      }
      if (end < this.lastPage) {
        pages.push("...");
        pages.push(this.lastPage);
      }
      return pages;
    },
  },
  async mounted() {
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == "Super" || role == "Admin") {
        this.getUserTrashs();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll(
            "#incompletedusers_wrapper .row.mx-2"
          );
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = "none";
            dataTableWrapper[1].style.display = "none";
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  },
  methods: {
    changeTableStatus(status){
      this.dataSteps = status;
    },

    getUserTrashs(page = 1, perPage = 10, searchValue = "") {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl + "admin/manage/incompleted/users", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage, search: searchValue },
        })
        .then((res) => {
          const { data, current_page, last_page, recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;
          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#incompletedusers")) {
            $("#incompletedusers").DataTable().destroy();
          }
            var table = $("#incompletedusers").DataTable({
              data: data,
              columns: [
                { data: "id" },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    if (row.user_type == "publisher-register") {
                      return '<span title="Publisher" class="badge bg-success text-white">Publisher</span>';
                    } else {
                      return '<span title="Advertiser" class="badge bg-warning text-white">Advertiser</span>';
                    }
                  },
                },
                { data: "fname", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "lname", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "email", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "phone_no", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "country", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "company_name", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "company_website", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "created_at", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "address", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "city", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "state", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "zip_code", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "country", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "skype_id", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "linkedin_id", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="trans_action d-flex"><button title="View" type="button" id="view-btn" data-bs-toggle="modal" data-bs-target="#contactInfoShow"  data-id=' +
                      row.id +
                      ' class="btn text-info  p-0"><i id="view-btn"  data-id=' +
                      row.id +
                      ' class="fa-regular fa-eye text-info me-2"></i></button><button title="Delete" type="button" id="delete-btn"  data-id=' +
                      row.id +
                      ' class="btn text-danger delete-btn p-0"><i  id="delete-btn"  data-id=' +
                      row.id +
                      ' class="fa-solid fa-trash"></i></button></div>'
                    );
                  },
                },
              ],
              
              initComplete: () => {
                $('#incompletedusers').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#incompletedusers").DataTable();
                const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

                dropdownItems.forEach((item) => {
                  const columnAttr = item.getAttribute("data-column"); 
                  if (columnAttr === "all") {
                    item.addEventListener("click", function (e) {
                      e.preventDefault();
                      table.columns().visible(true);
                      dropdownItems.forEach((el) => {
                        if (el.getAttribute("data-column") !== "all") {
                          el.classList.add("active");
                        }
                      });
                    });
                  } else {
                    const columnIndex = parseInt(columnAttr);
                    const column = table.column(columnIndex);
                    if (column.visible()) {
                      item.classList.add("active");
                    }

                    item.addEventListener("click", function (e) {
                      e.preventDefault();

                      const currentVisible = column.visible();
                      column.visible(!currentVisible);

                      if (!currentVisible) {
                        item.classList.add("active");
                      } else {
                        item.classList.remove("active");
                      }
                    });
                  }
                });
                $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
                });
                this.attachEventListeners();
                this.attachEventListenersOfButton();
                this.attachEventListenersForMenu();
                this.attachEventListenersForSearch();
                this.attachEventListenersBlulkAction();
                this.attachEventListenersBlulkActionSubmit();

                const searchInput = $("#incompletedusers_filter input");
                searchInput.val(this.searchInputValue);
                if (this.searchInputValue != "") {
                  searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getUserTrashs(1, perPage, searchTerm);
                });
              },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  searchable: false,
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                  },
                  render: function (data, type, row) {
                    return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                  },
                  searchable: false,
                },
                { targets: 11, orderable: false, className: 'dt-center' }
              ],
              order: [[9, "desc"]],
              dom:
                '<"row mx-2"' +
                '<"col-md-4 px-0"f>' +
                '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
                '<"col-md-3 d-none"p>>' +
                "t" +
                '<"row mx-2"' +
                '<"col-md-5 d-none"i>' +
                '<"col-md-7 d-none"p>>',
              displayLength: perPage,
              lengthMenu: [10, 20, 50, 100, 200],
              language: {
                sLengthMenu: "_MENU_",
                search: "",
                searchPlaceholder: "Search Publisher",
                paginate: {
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>',
                },
              },
              buttons: [
              {
                text: `
                  <div id="bulk-action-wrapper">
                    <select id="bulk-action-select" class="form-select form-select-sm">
                      <option value=""> ✓ Bulk Actions</option>
                      <option value="delete">Bulk Delete</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
                {
                  extend: "collection",
                  className: "btn btn-label-primary dropdown-toggle me-3",
                  text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                  buttons: [
                    // {
                    //   extend: "print",
                    //   text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15] },
                    // },
                    {
                      extend: "csv",
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    {
                      extend: "excel",
                      text:
                        '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    // {
                    //   extend: "pdf",
                    //   text:
                    //     '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15] },
                    // },
                    {
                      extend: "copy",
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    // {
                    //   extend: "colvis",
                    //   text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>colvis',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    // },
                  ],
                },
                {
                  text: '<i class="ti ti-copy me-1 ti-xs"></i>Select Step',
                  className: "btn btn-primary dropdown-toggle dropbottom select_step_btn",
                  action: function (e, dt, node, config) {
                    $(".dropdown-menu").remove();
                    const dropdown = `
                          <div class="dropdown-menu show" style="position:absolute;z-index:1050;top:3.4rem;left:84%;">
                            <a class="dropdown-item" href="#" id="step-1">Step 1</a>
                            <a class="dropdown-item" href="#" id="step-2">Step 2</a>
                          </div>`;
                    const dropdownContainer = $(node).parent();
                    dropdownContainer.append(dropdown);

                    $(".dropdown-item")
                      .off()
                      .on("click", (event) => {
                        event.preventDefault();
                        const id = event.target.id;

                        if (id === "step-1") {
                          this.changeTableStatus(1);
                        } else if (id === "step-2") {
                          this.changeTableStatus(2);
                        }
                        $(".dropdown-menu").remove();
                      });

                    $(document).on("click.dropdown", (event) => {
                      if (!$(event.target).closest(".dropdown-menu, .btn").length) {
                        $(".dropdown-menu").remove();
                        $(document).off("click.dropdown");
                      }
                    });
                  }.bind(this),
                },
                 {
                  className: "btn btn-primary mx-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">User Type</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Email</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone</a></li><li><a class="dropdown-item" href="#" data-column="6">Country</a></li><li><a class="dropdown-item" href="#" data-column="7">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="8">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="9">Created At</a></li><li><a class="dropdown-item" href="#" data-column="10">Address</a></li><li><a class="dropdown-item" href="#" data-column="11">City</a></li><li><a class="dropdown-item" href="#" data-column="12">State</a></li><li><a class="dropdown-item" href="#" data-column="13">Zip Code</a></li><li><a class="dropdown-item" href="#" data-column="14">Skype Id</a></li><li><a class="dropdown-item" href="#" data-column="15">Linkedin Id</a></li><li><a class="dropdown-item" href="#" data-column="16">Action</a></li></div></ul></div>',
                },
                {
              text:
                '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
              className: "btn btn-primary",
              attr: { id: "all_filters"},
            },
              ],
            });
            
          this.getLoader = false;
        })
        .catch((error) => {
          return error;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersOfButton() {
      $("#incompletedusers_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        } 
      });
    },

    externalfilterreset(){
      this.checkfilter.columns = ['fname'],
      this.checkfilter.showcolumn = "First Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          fname : [],
          lname : [],
          slug : [],
          email : [],
          user_type : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          country_code : [],
          country : [],
          browser : [],
          os : [],
          skype_id : [],
          linkedin_id : [],
          facebook_id : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          fname : [],
          lname : [],
          email : [],
          user_type : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          country_code : [],
          country : [],
          browser : [],
          os : [],
          skype_id : [],
          linkedin_id : [],
          facebook_id : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          fname : [],
          lname : [],
          email : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          country_code : [],
          country : [],
          browser : [],
          os : [],
          skype_id : [],
          linkedin_id : [],
          facebook_id : [],
          created_at : [],
      },
      this.checkfilter.selectedValues = {
        user_type : [],
      },
      this.checkfilter.applyfillters = [],
      this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
      this.clickCheckboxFilters();
    },
        
    clickFilters(value,type, key) {
          if (!Array.isArray(this.checkfilter.columns)) {
            this.checkfilter.columns = [];
          }
          if (!this.checkfilter.columns.includes(value)) {
              this.checkfilter.columns.push(value);
          }
          this.checkfilter.types.push(type);
          this.checkfilter.showcolumn = key;
          this.getFiltarOfExtranalFilter();
    },
    
    clickCheckboxFilters(value) {
          if (!Array.isArray(this.applyfillters)) {
            this.applyfillters = [];
          }
          if (value !== null && value !== undefined && !this.applyfillters.includes(value)) {
            this.applyfillters.push(value);
          }
          this.getFiltarOfExtranalFilter();
    },
    
    removeSearch(value, key, type) {
          if (!Array.isArray(this.applyfillters)) {
            this.applyfillters = [];
          }
          const index = this.applyfillters.indexOf(value);
          if (index > -1) {
            this.applyfillters.splice(index, 1);
            if (this.checkfilter.emptyValues.hasOwnProperty(key)) {
              this.checkfilter.emptyValues[key] = [];
            }
    
            if (this.checkfilter.notemptyValues.hasOwnProperty(key)) {
              this.checkfilter.notemptyValues[key] = [];
            }
    
            if (type == 'select') {
              if (this.checkfilter.selectedValues.hasOwnProperty(key)) {
                this.checkfilter.selectedValues[key] = [];
              }
            } else {
              if (this.checkfilter.searchValues.hasOwnProperty(key)) {
                this.checkfilter.searchValues[key] = [];
              }
            }
          }
          this.getFiltarOfExtranalFilter();
    },
    
    getFiltarOfExtranalFilter(perPage = 10,) {
          axios
            .post(
              this.globalVariables.apiUrl + "admin/manage/incompleted/search-get-data-all-filter",
              this.checkfilter,
              {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
              }
            )
            .then((res) => {
              const { data, current_page, last_page,recordsTotal } = res.data;
              this.currentPage = current_page;
              this.lastPage = last_page;
              this.recordsTotal = recordsTotal;
              this.startPage = (current_page - 1) * perPage + 1;
              this.endPage = Math.min(current_page * perPage, recordsTotal);
    
              // if ($.fn.DataTable.isDataTable("#offer_datatables")) {
              //   $("#offer_datatables").DataTable().destroy();
              // }
    
              if ($.fn.DataTable.isDataTable("#incompletedusers")) {
                const table = $("#incompletedusers").DataTable();
                table.clear();
                table.rows.add(data ?? []);
                table.draw();
              } else {
                var table = $("#incompletedusers").DataTable({
              data: data,
              columns: [
                { data: "id" },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    if (row.user_type == "publisher-register") {
                      return '<span title="Publisher" class="badge bg-success text-white">Publisher</span>';
                    } else {
                      return '<span title="Advertiser" class="badge bg-warning text-white">Advertiser</span>';
                    }
                  },
                },
                { data: "fname", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "lname", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "email", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "phone_no", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "country", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "company_name", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "company_website", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "created_at", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "address", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "city", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "state", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "zip_code", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "country", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "skype_id", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                { data: "linkedin_id", render: function(data) { return data ? '<span title="'+data+'">'+data+'</span>' : '-----'; } },
                {
                  data: "updated_at",
                  render: function (data, type, row) {
                    return (
                      '<div class="trans_action d-flex"><button title="View" type="button" id="view-btn" data-bs-toggle="modal" data-bs-target="#contactInfoShow"  data-id=' +
                      row.id +
                      ' class="btn text-info  p-0"><i id="view-btn"  data-id=' +
                      row.id +
                      ' class="fa-regular fa-eye text-info me-2"></i></button><button title="Delete" type="button" id="delete-btn"  data-id=' +
                      row.id +
                      ' class="btn text-danger delete-btn p-0"><i  id="delete-btn"  data-id=' +
                      row.id +
                      ' class="fa-solid fa-trash"></i></button></div>'
                    );
                  },
                },
              ],
              
              initComplete: () => {
                $('#incompletedusers').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#incompletedusers").DataTable();
                const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');

                dropdownItems.forEach((item) => {
                  const columnAttr = item.getAttribute("data-column"); 
                  if (columnAttr === "all") {
                    item.addEventListener("click", function (e) {
                      e.preventDefault();
                      table.columns().visible(true);
                      dropdownItems.forEach((el) => {
                        if (el.getAttribute("data-column") !== "all") {
                          el.classList.add("active");
                        }
                      });
                    });
                  } else {
                    const columnIndex = parseInt(columnAttr);
                    const column = table.column(columnIndex);
                    if (column.visible()) {
                      item.classList.add("active");
                    }

                    item.addEventListener("click", function (e) {
                      e.preventDefault();

                      const currentVisible = column.visible();
                      column.visible(!currentVisible);

                      if (!currentVisible) {
                        item.classList.add("active");
                      } else {
                        item.classList.remove("active");
                      }
                    });
                  }
                });
                $('.select-colunm-position').on('click', function (e) {
                  e.stopPropagation();
                });

                $('.select-colunm-position .dropdown-item').on('click', function (e) {
                  e.stopPropagation();
                });
                this.attachEventListeners();
                this.attachEventListenersOfButton();
                this.attachEventListenersForMenu();
                this.attachEventListenersForSearch();
                this.attachEventListenersBlulkAction();
                this.attachEventListenersBlulkActionSubmit();

                const searchInput = $("#incompletedusers_filter input");
                searchInput.val(this.searchInputValue);
                if (this.searchInputValue != "") {
                  searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getUserTrashs(1, perPage, searchTerm);
                });
              },
              columnDefs: [
                {
                  targets: 0,
                  orderable: false,
                  searchable: false,
                  checkboxes: {
                    selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                  },
                  render: function (data, type, row) {
                    return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                  },
                  searchable: false,
                },
                { targets: 11, orderable: false, className: 'dt-center' }
              ],
              order: [[9, "desc"]],
              dom:
                '<"row mx-2"' +
                '<"col-md-4 px-0"f>' +
                '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' +
                '<"col-md-3 d-none"p>>' +
                "t" +
                '<"row mx-2"' +
                '<"col-md-5 d-none"i>' +
                '<"col-md-7 d-none"p>>',
              displayLength: perPage,
              lengthMenu: [10, 20, 50, 100, 200],
              language: {
                sLengthMenu: "_MENU_",
                search: "",
                searchPlaceholder: "Search Publisher",
                paginate: {
                  previous: '<i class="fa-solid fa-chevron-left"></i>',
                  next: '<i class="fa-solid fa-chevron-right"></i>',
                },
              },
              buttons: [
              {
                text: `
                  <div id="bulk-action-wrapper">
                    <select id="bulk-action-select" class="form-select form-select-sm">
                      <option value=""> ✓ Bulk Actions</option>
                      <option value="delete">Bulk Delete</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
                {
                  extend: "collection",
                  className: "btn btn-label-primary dropdown-toggle me-3",
                  text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                  buttons: [
                    // {
                    //   extend: "print",
                    //   text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15] },
                    // },
                    {
                      extend: "csv",
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    {
                      extend: "excel",
                      text:
                        '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    // {
                    //   extend: "pdf",
                    //   text:
                    //     '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15] },
                    // },
                    {
                      extend: "copy",
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: "dropdown-item",
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    },
                    // {
                    //   extend: "colvis",
                    //   text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>colvis',
                    //   className: "dropdown-item",
                    //   exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] },
                    // },
                  ],
                },
                {
                  text: '<i class="ti ti-copy me-1 ti-xs"></i>Select Step',
                  className: "btn btn-primary dropdown-toggle dropbottom select_step_btn",
                  action: function (e, dt, node, config) {
                    $(".dropdown-menu").remove();
                    const dropdown = `
                          <div class="dropdown-menu show" style="position:absolute;z-index:1050;top:3.4rem;left:84%;">
                            <a class="dropdown-item" href="#" id="step-1">Step 1</a>
                            <a class="dropdown-item" href="#" id="step-2">Step 2</a>
                          </div>`;
                    const dropdownContainer = $(node).parent();
                    dropdownContainer.append(dropdown);

                    $(".dropdown-item")
                      .off()
                      .on("click", (event) => {
                        event.preventDefault();
                        const id = event.target.id;

                        if (id === "step-1") {
                          this.changeTableStatus(1);
                        } else if (id === "step-2") {
                          this.changeTableStatus(2);
                        }
                        $(".dropdown-menu").remove();
                      });

                    $(document).on("click.dropdown", (event) => {
                      if (!$(event.target).closest(".dropdown-menu, .btn").length) {
                        $(".dropdown-menu").remove();
                        $(document).off("click.dropdown");
                      }
                    });
                  }.bind(this),
                },
                 {
                  className: "btn btn-primary mx-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">User Type</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Email</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone</a></li><li><a class="dropdown-item" href="#" data-column="6">Country</a></li><li><a class="dropdown-item" href="#" data-column="7">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="8">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="9">Created At</a></li><li><a class="dropdown-item" href="#" data-column="10">Address</a></li><li><a class="dropdown-item" href="#" data-column="11">City</a></li><li><a class="dropdown-item" href="#" data-column="12">State</a></li><li><a class="dropdown-item" href="#" data-column="13">Zip Code</a></li><li><a class="dropdown-item" href="#" data-column="14">Skype Id</a></li><li><a class="dropdown-item" href="#" data-column="15">Linkedin Id</a></li><li><a class="dropdown-item" href="#" data-column="16">Action</a></li></div></ul></div>',
                },
                {
              text:
                '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
              className: "btn btn-primary",
              attr: { id: "all_filters"},
            },
              ],
            });
              };
              this.getLoader = false;
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              // this.getSkeletonLoader = false;
              this.getLoader = false;
    });
    },

    formatTime(dateString) {
      const date = new Date(dateString);
      return format(date, "dd MMMM yyyy");
    },
    attachEventListeners() {
      $("#incompletedusers").on("click", ".trans_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === "delete-btn") {
          this.delteTranUser(dataId);
        } else if (dataClass === "view-btn") {
          this.getLoader = true;
          axios
            .get(
              this.globalVariables.apiUrl + `admin/manage/incompleted/details/${dataId}`,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              document.querySelector("#f-name").innerHTML =
                res.data.data.fname ?? "--------";
              document.querySelector("#l-name").innerHTML =
                res.data.data.lname ?? "--------";
              document.querySelector("#email").innerHTML =
                res.data.data.email ?? "--------";
              document.querySelector("#phone-number").innerHTML =
                res.data.data.phone_no ?? "--------";
              document.querySelector("#country_code").innerHTML =
                res.data.data.country_code ?? "--------";
              document.querySelector("#company_name").innerHTML =
                res.data.data.company_name ?? "--------";
              document.querySelector("#company_website").innerHTML =
                res.data.data.company_website ?? "--------";

              document.querySelector("#address").innerHTML =
                res.data.data.address ?? "--------";
              document.querySelector("#city").innerHTML =
                res.data.data.city ?? "--------";
              document.querySelector("#state").innerHTML =
                res.data.data.state ?? "--------";
              document.querySelector("#zip_code").innerHTML =
                res.data.data.zip_code ?? "--------";
              document.querySelector("#country").innerHTML =
                res.data.data.country ?? "--------";
              document.querySelector("#skype_id").innerHTML =
                res.data.data.skype_id ?? "--------";
              document.querySelector("#linkedin_id").innerHTML =
                res.data.data.linkedin_id ?? "--------";
              document.querySelector("#facebook_id").innerHTML =
                res.data.data.facebook_id ?? "--------";

              document.querySelector("#ip_address").innerHTML =
                res.data.data.ip_address ?? "--------";
              document.querySelector("#user_agent").innerHTML =
                res.data.data.user_agent ?? "--------";
              document.querySelector("#browser").innerHTML =
                res.data.data.browser ?? "--------";
              document.querySelector("#os").innerHTML =
                res.data.data.os ?? "--------";

              if(res.data.data.address != null || res.data.data.city != null || res.data.data.state != null || res.data.data.zip_code != null ||res.data.data.country != null || res.data.data.skype_id != null || res.data.data.linkedin_id != null || res.data.data.facebook_id != null){
                document.querySelector("#step").innerHTML = 2 ;
              }else{
                document.querySelector("#step").innerHTML = 1 ;
              }
              

              if (res.data.data.user_type == "advertiser-register") {
                document.querySelector("#user_type").innerHTML =
                  '<span class="badge bg-warning text-white">Advertiser</span>';
              } else {
                document.querySelector("#user_type").innerHTML =
                  '<span class="badge bg-success text-white">Publisher</span>';
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
            });
        }
      });
    },

    attachEventListenersBlulkAction() {
      $('#incompletedusers').on('change', '.row-checkbox', (event) => {
        const id = parseInt(event.target.dataset.id);
        if (event.target.checked) {
          if (!this.bulkactionids.selectedIds.includes(id)) {
            this.bulkactionids.selectedIds.push(id);
          }
        } else {
          this.bulkactionids.selectedIds = this.bulkactionids.selectedIds.filter(item => item !== id);
        }

        this.toggleBulkActionVisibility();
      });
      $('#incompletedusers thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#incompletedusers tbody .row-checkbox').each((index, checkbox) => {
          checkbox.checked = isChecked;
          const id = parseInt(checkbox.dataset.id);

          if (isChecked) {
            if (!this.bulkactionids.selectedIds.includes(id)) {
              this.bulkactionids.selectedIds.push(id);
            }
          } else {
            this.bulkactionids.selectedIds = [];
          }
        });

        this.toggleBulkActionVisibility();
      });
    },

    attachEventListenersBlulkActionSubmit() {
      $('#bulk-action-select').off().on('change', (e) => {
        const action = e.target.value;
        if (!action || this.bulkactionids.selectedIds.length === 0) {
          return;
        }
        
        if (action === 'delete') {
          this.bulkDelete();
        }
        $('#bulk-action-select').val('');
      });
    },

    toggleBulkActionVisibility() {
      const bulkActionWrapper = $('#bulk-action-container');
      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapper?.removeClass('d-none');
      } else {
        bulkActionWrapper?.addClass('d-none');
      }
    },

    bulkDelete() {
      Swal.fire({
        text: 'Are Sure Delete',
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "admin/manage/incompleted/bulk/delete",
                this.bulkactionids,
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                if (res.data.status == "success") {
                  toastr.success(res.data.message);
                  this.getUserTrashs();
                } else {
                  toastr.error(res.data.message);
                }
              })
              .catch((e) => {
                return e;
              })
              .finally(() => {
                this.getLoader = false;
              });
        }
      });
    },


    attachEventListenersForMenu() {
      $("#incompletedusers_wrapper [name='incompletedusers_length']").on(
        "change",
        (event) => {
          this.getLoader = true;
          const target = $(event.target);
          const getSelectedValue = target.val();
          this.getUserTrashs(1, getSelectedValue);
        }
      );
    },
    attachEventListenersForSearch() {
      $("#incompletedusers_wrapper #incompletedusers_filter input").on(
        "keyup",
        (event) => {
          const target = $(event.target);
          const getSearchValue = target.val();
          this.getUserTrashs(1, 10, getSearchValue);
        }
      );
    },
    // User Delete
    delteTranUser(id) {
      Swal.fire({
        text: "Are you sure delete",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          this.getLoader = true;
          axios
            .get(this.globalVariables.apiUrl + `admin/manage/incompleted/delete/${id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              if (res.data.status == "success") {
                toastr.success(res.data.message);
                this.getUserTrashs();
              } else {
                toastr.error(res.data.message);
              }
            })
            .catch((e) => {
              return e;
            })
            .finally(() => {
              this.getLoader = false;
            });
        }
      });
    },
  },
};
</script>
<style scoped>
td {
  padding: 6px 15px !important;
}
</style>
<style>
#incompletedusers td {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 70px;
}
#incompletedusers th {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 70px;
}
#incompletedusers colgroup:nth-of-type(2) {
  display: none !important;
}
#incompletedusers .dt-checkboxes-cell {
  padding: 0.7rem 0.5rem !important;
}
 .dataTables_steps1 tbody tr td:nth-child(11) , .dataTables_steps1 tbody tr td:nth-child(12) , .dataTables_steps1 tbody tr td:nth-child(13), .dataTables_steps1 tbody tr td:nth-child(14), .dataTables_steps1 tbody tr td:nth-child(15), .dataTables_steps1 tbody tr td:nth-child(16),.dataTables_steps1 tbody tr td:nth-child(17){
 display: none;
}

.dataTables_steps2 tbody tr td:nth-child(3), .dataTables_steps2 tbody tr td:nth-child(4) , .dataTables_steps2 tbody tr td:nth-child(5) , .dataTables_steps2 tbody tr td:nth-child(6), .dataTables_steps2 tbody tr td:nth-child(7), .dataTables_steps2 tbody tr td:nth-child(8), .dataTables_steps2 tbody tr td:nth-child(9),.dataTables_steps2 tbody tr td:nth-child(10){
 display: none;
}
.select_step_btn {
	background: #e9e7fd !important;
	color: #7367f0 !important;
}
.select_step_btn:hover {
	color: #0162e8 !important;
	background: #e9e7fd !important;
}
#incompletedusers {
	width: 100% !important;
}


</style>
