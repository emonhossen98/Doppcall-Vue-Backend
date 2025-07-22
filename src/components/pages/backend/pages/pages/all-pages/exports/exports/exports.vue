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
            <div class="card mt-4">
                <div class="card-header pt-3 pb-1">
                  <h5 class="card-title mb-0">
                    Users
                  </h5>
                </div>
              <div class="card-body">
                <table class="align-middle mb-0 table table-hover" id="data_tables_report">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th></th>
                      <th>Name</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Slug</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Company Website</th>
                      <th>Monthly Visitors</th>
                      <th>User Offers</th>
                      <th>Traffic Urls</th>
                      <th>Country Code</th>
                      <th>Browser</th>
                      <th>OS</th>
                      <th>Skype</th>
                      <th>Telegram</th>
                      <th>Facebook</th>
                      <th>Status</th>
                      <th>Email Verified</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
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
                            <a :class="checkfilter.showcolumn == 'Name' ? 'check-active' : ''"
                              @click="clickFilters('name', 'search', 'Name')">Name 
                            </a>
                            <template v-if="applyfillters.includes('Name')">
                              <span @click="removeSearch('Name','name','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
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
                            <a :class="checkfilter.showcolumn == 'Slug' ? 'check-active' : ''"
                              @click="clickFilters('slug', 'search', 'Slug')">Slug 
                            </a>
                            <template v-if="applyfillters.includes('Slug')">
                              <span @click="removeSearch('Slug','slug','search')" id="remove-to-search-list">x</span>
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
                              @click="clickFilters('role_id', 'select', 'Role')">Role <i class="fa-solid fa-caret-down"></i>
                            </a>
                            <template v-if="applyfillters.includes('Role')">
                              <span @click="removeSearch('Role','role_id','select')" id="remove-to-search-list">x</span>
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
                            <a :class="checkfilter.showcolumn == 'Monthly Visitors' ? 'check-active' : ''"
                              @click="clickFilters('monthly_visitors', 'search', 'Monthly Visitors')">Monthly Visitors 
                            </a>
                            <template v-if="applyfillters.includes('Monthly Visitors')">
                              <span @click="removeSearch('Monthly Visitors','monthly_visitors','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'User Offers' ? 'check-active' : ''"
                              @click="clickFilters('user_offers', 'search', 'User Offers')">User Offers 
                            </a>
                            <template v-if="applyfillters.includes('User Offers')">
                              <span @click="removeSearch('User Offers','user_offers','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Traffic Urls' ? 'check-active' : ''"
                              @click="clickFilters('traffic_urls', 'search', 'Traffic Urls')">Traffic Urls 
                            </a>
                            <template v-if="applyfillters.includes('Traffic Urls')">
                              <span @click="removeSearch('Traffic Urls','traffic_urls','search')" id="remove-to-search-list">x</span>
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
                              @click="clickFilters('skype', 'search', 'Skype')">Skype 
                            </a>
                            <template v-if="applyfillters.includes('Skype')">
                              <span @click="removeSearch('Skype','skype','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Telegram' ? 'check-active' : ''"
                              @click="clickFilters('telegram', 'search', 'Telegram')">Telegram 
                            </a>
                            <template v-if="applyfillters.includes('Telegram')">
                              <span @click="removeSearch('Telegram','telegram','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Facebook' ? 'check-active' : ''"
                              @click="clickFilters('facebook', 'search', 'Facebook')">Facebook 
                            </a>
                            <template v-if="applyfillters.includes('Facebook')">
                              <span @click="removeSearch('Facebook','facebook','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                              @click="clickFilters('account_access', 'select', 'Status')">Status <i class="fa-solid fa-caret-down"></i> 
                            </a>
                            <template v-if="applyfillters.includes('Status')">
                              <span @click="removeSearch('Status','account_access','select')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Verified' ? 'check-active' : ''"
                              @click="clickFilters('verified', 'select', 'Verified')">Verified <i class="fa-solid fa-caret-down"></i> 
                            </a>
                            <template v-if="applyfillters.includes('Verified')">
                              <span @click="removeSearch('Verified','verified','select')" id="remove-to-search-list">x</span>
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
                          <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['name']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
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
                          <template v-if="checkfilter.showcolumn == 'Slug' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['slug']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['slug']" type="checkbox" value="0" id="isnotemptyvalue">
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
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['role_id']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['role_id']" type="checkbox" value="0" id="isnotemptyvalue">
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
                          <template v-if="checkfilter.showcolumn == 'Monthly Visitors' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['monthly_visitors']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['monthly_visitors']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'User Offers' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['user_offers']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['user_offers']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Traffic Urls' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['traffic_urls']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['traffic_urls']" type="checkbox" value="0" id="isnotemptyvalue">
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
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['skype']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['skype']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Telegram' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['telegram']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['telegram']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Facebook' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['facebook']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['facebook']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['account_access']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['account_access']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Verified' && checkfilter.types.includes('select')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['Verified']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['Verified']" type="checkbox" value="0" id="isnotemptyvalue">
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
                              <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['name']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
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
                              <template v-if="checkfilter.showcolumn == 'Slug' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['slug']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['email']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')">
                              <template v-if="roles?.roles?.length > 0">
                                  <template v-for="(role,index) in roles?.roles" :key="index">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['role_id']" class="form-check-input" type="checkbox" :value="role.id" :id="'dynamicid'+role.id">
                                      <label class="form-check-label" :for="'dynamicid'+role.id">
                                        {{ role.secondary_name ?? '' }}
                                      </label>
                                    </div>
                                  </template>
                                </template>
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
                              <template v-if="checkfilter.showcolumn == 'Monthly Visitors' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['monthly_visitors']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'User Offers' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['user_offers']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Traffic Urls' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['traffic_urls']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Country Code' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['country_code']"
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
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['skype']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Telegram' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['telegram']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Facebook' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['country_code']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="0" id="dynamicidstatus0">
                                      <label class="form-check-label" for="dynamicidstatus0">
                                        Pending
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="1" id="dynamicidstatus1">
                                      <label class="form-check-label" for="dynamicidstatus1">
                                        Approved
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="2" id="dynamicidstatus2">
                                      <label class="form-check-label" for="dynamicidstatus2">
                                        Suspend
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="3" id="dynamicidstatus3">
                                      <label class="form-check-label" for="dynamicidstatus3">
                                        Unsuspend
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_access']" class="form-check-input" type="checkbox" value="4" id="dynamicidstatus4">
                                      <label class="form-check-label" for="dynamicidstatus4">
                                        Pause
                                      </label>
                                    </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Verified' && checkfilter.types.includes('select')">
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['verified']" class="form-check-input" type="checkbox" value="1" id="1">
                                    <label class="form-check-label" for="1">
                                      Verified
                                    </label>
                                  </div>
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['verified']" class="form-check-input" type="checkbox" value="2" id="2">
                                    <label class="form-check-label" for="2">
                                      Unverified
                                    </label>
                                  </div>
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
                  <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                    <ul class="pagination mb-0">
                      <!-- Previous Button -->
                      <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="getAdminUserExport(currentPage - 1)" :disabled="currentPage === 1" >
                          <i class="fa-solid fa-chevron-left"></i>
                        </button>
                      </li>

                      <!-- Page Numbers -->
                      <template v-for="page in paginationPages" :key="page">
                        <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                          <button class="page-link" @click="getAdminUserExport(page)">
                            {{ page }}
                          </button>
                        </li>
                      </template>

                      <!-- Next Button -->
                      <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                        <button  class="page-link" @click="getAdminUserExport(currentPage + 1)" :disabled="currentPage === lastPage">
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
import moment from "moment";

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
        { label: "Export", url: "" },
      ],
      getLoader: false,
      currentPage: 1,
      lastPage: 1,
      recordsTotal : 0,
      startPage : 0,
      endPage : 0,
      searchInputValue : "",
      bulkactionids : {
        selectedIds: [],
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['name'],
        showcolumn: "Name",
        types : ['search'],
        emptyValues : {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          role_id : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          account_access : [],
          verified : [],
          created_at : [],
        },
        notemptyValues : {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          role_id : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          account_access : [],
          verified : [],
          created_at : [],
        },
        searchValues : {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          created_at : [],
        },
        selectedValues: {
          role_id : [],
          account_access : [],
          verified : [],
        },
      },
      applyfillters : [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getAdminUserExport();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#data_tables_report_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
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
        if (start > 2) pages.splice(1, 0, '...');
      }
      if (end < this.lastPage) {
        pages.push('...');
        pages.push(this.lastPage);
      }
      return pages;
    },
  },
  methods: {
    getAdminUserExport(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/export/users/get-data",{
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage,search: searchValue},
        })
        .then((res) => {
          const { data, current_page, last_page,recordsTotal } = res.data;
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#data_tables_report")) {
            $('#data_tables_report').DataTable().destroy();
          }
          var formateDate = this.formatDates;
        var table = $('#data_tables_report').DataTable({
          data: data,
          columns: [
              // { data: "0" },
              { data: "id" },
              { data: "name",
                render: function (data, type, row) {
                  if (row?.name != null && row?.name != "") {
                    return '<span title="'+row?.name+'">'+row?.name+'</span>';
                  }
                  return '----------';
                },
               }, 
              { data: "fname",
                render: function (data, type, row) {
                  if (row?.fname != null && row?.fname  != "") {
                    return '<span title="'+row?.fname +'">'+row?.fname +'</span>';
                  }
                  return '----------';
                },
               },
              { data: "lname",
                render: function (data, type, row) {
                  if (row?.lname != null && row?.lname != "") {
                    return '<span title="'+row?.lname+'">'+row?.lname+'</span>';
                  }
                  return '----------';
                },
               }, 
              { data: "slug",
                render: function (data, type, row) {
                  if (row?.slug != null && row?.slug != "") {
                    return '<span title="'+row?.slug+'">'+row?.slug+'</span>';
                  }
                  return '----------';
                },
               }, 
              { data: "email",
                render: function (data, type, row) {
                  if (row?.email != null && row?.email != "") {
                    return '<span title="'+row?.email+'">'+row?.email+'</span>';
                  }
                  return '----------';
                },
               },  
              { data: "role",
                render: function (data, type, row) {
                  if (row?.role?.secondary_name != null && row?.role?.secondary_name != "") {
                    return '<span title="'+row?.role?.secondary_name+'">'+row?.role?.secondary_name+'</span>';
                  }
                  return '----------';
                },
               },  
              { data: "phone_no",
                render: function (data, type, row) {
                  if (row?.phone_no != null && row?.phone_no != "") {
                    return '<span title="'+row?.phone_no+'">'+row?.phone_no+'</span>';
                  }
                  return '----------';
                },
               }, 
              { data: "company_name",
                render: function (data, type, row) {
                  if (row['company_name'] != null && row['company_name'] != "") {
                    return '<span title="'+row['company_name']+'">'+row['company_name']+'</span>';
                  }
                  return '----------';
                },
               }, 
              { data: "company_website",
                render: function (data, type, row) {
                  if (row?.company_website != null && row?.company_website != "") {
                    return '<span title="'+row?.company_website+'">'+row?.company_website+'</span>';
                  }
                  return '----------';
                },
               },  
              { data: "monthly_visitors",
                render: function (data, type, row) {
                  if (row?.monthly_visitors != null && row?.monthly_visitors != "") {
                     return '<span title="'+row?.monthly_visitors+'">'+row?.monthly_visitors+'</span>';
                  }
                  return '----------';
                },
               },  
              { data: "user_offers",
                render: function (data, type, row) {
                  if (row?.user_offers != null && row?.user_offers != "") {
                     return '<span title="'+row?.user_offers+'">'+row?.user_offers+'</span>';
                  }
                  return '----------';
                },
               },  
              { data: "traffic_urls",
                render: function (data, type, row) {
                  if (row?.traffic_urls != null && row?.traffic_urls != "") {
                     return '<span title="'+row?.traffic_urls+'">'+row?.traffic_urls+'</span>';
                  }
                  return '----------';
                },
               },
               { data: "country_code",
                render: function (data, type, row) {
                  if (row?.country_code != null && row?.country_code != "") {
                    return '<span title="'+row?.country_code+'">'+row?.country_code+'</span>';
                  }
                  return '----------';
                },
               },  
               { data: "browser",
                render: function (data, type, row) {
                  if (row?.browser != null && row?.browser != "") {
                    return '<span title="'+row?.browser+'">'+row?.browser+'</span>';
                  }
                  return '----------';
                },
               },  
               { data: "os",
                render: function (data, type, row) {
                  if (row?.os != null && row?.os != "") {
                    return '<span title="'+row?.os+'">'+row?.os+'</span>';
                  }
                  return '----------';
                },
               },     
               { data: "skype",
                render: function (data, type, row) {
                  if (row?.skype != null && row?.skype != "") {
                    return '<span title="'+row?.skype+'">'+row?.skype+'</span>';
                  }
                  return '----------';
                },
               },     
               { data: "telegram",
                render: function (data, type, row) {
                  if (row?.telegram != null && row?.telegram != "") {
                    return '<span title="'+row?.telegram+'">'+row?.telegram+'</span>';
                  }
                  return '----------';
                },
               },     
               { data: "facebook",
                render: function (data, type, row) {
                  if (row?.facebook != null && row?.facebook != "") {
                    return '<span title="'+row?.facebook+'">'+row?.facebook+'</span>';
                  }
                  return '----------';
                },
               },     
               { data: "status",
                render: function (data, type, row) {
                  if (row?.account_access === 0) {
                    return '<span title="Pending" class="badge bg-warning">Pending</span>';
                  }
                  else if (row?.account_access === 1) {
                    return '<span title="Approved" class="badge bg-success">Approved</span>';
                  }
                  else if (row?.account_access === 2) {
                    return '<span title="Suspend" class="badge bg-danger">Suspend</span>';
                  }
                  else if (row?.account_access === 3) {
                    return '<span title="Unsuspend" class="badge bg-success">Unsuspend</span>';
                  }
                  else if (row?.account_access === 4) {
                    return '<span title="Pause" class="badge bg-info">Pause</span>';
                  }
                  else {
                    return '<span title="Resume" class="badge bg-success">Resume</span>';
                  }
                },
               },          
               { data: "is_email_verified",
                render: function (data, type, row) {
                  if (row?.is_email_verified != null) {
                    return '<span title="Verified" class="badge bg-success">Verified</span>';
                  }else {
                    return '<span title="Unverified" class="badge bg-danger">Unverified</span>';
                  }
                },
               },          
               { data: "created_at",
                render: function (data, type, row) {
                  if (row?.created_at != null && row?.created_at != "") {
                    return formateDate(row?.created_at);
                  }
                  return '----------';
                },
               },     
              ],
          initComplete: () => { 
            $('#data_tables_report').wrap('<div class="commonDataTablesClass"></div>');
            const table = $("#data_tables_report").DataTable();
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
            this.attachEventListenersForSearch();
            this.attachEventListenersOfButton();
            this.attachEventListenersForMenu();
            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();

            const searchInput = $("#data_tables_report_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
              searchInput.focus();
            }
            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getAdminUserExport(1, perPage, searchTerm);
            });
          },
          // createdRow: function (row, data, dataIndex) {
          //       $('td:eq(0)', row).html(dataIndex + 1);
          // },
          columnDefs: [
            {
              targets: 0,
              orderable: false,
              checkboxes: {
                selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
              },
              render: function (data, type, row) {
                return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row?.id}">`;
              },
              searchable: false
            },
            {
              targets: 9, 
              visible: false,
            },
            {
              targets: 10, 
              visible: false,
            },
            {
              targets: 11, 
              visible: false,
            },
            {
              targets: 12, 
              visible: false,
            },
            {
              targets: 13, 
              visible: false,
            },
            {
              targets: 14, 
              visible: false,
            },
            {
              targets: 15, 
              visible: false,
            },
            {
              targets: 16, 
              visible: false,
            },
            {
              targets: 17, 
              visible: false,
            },
            {
              targets: 18, 
              visible: false,
            },
          ],
          order: [[2, 'desc']],
          dom: '<"row mx-2"' +
            '<"col-md-4 px-0"f>' + 
            '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
            '<"col-md-3 d-none"p>>' +
            't' + 
            '<"row mx-2"' +
            '<"col-md-5 d-none"i>' + 
            '<"col-md-7 d-none"p>>', 
          displayLength: perPage, 
          lengthMenu: [10, 20, 50, 100, 200], 
          language: {
            sLengthMenu: '_MENU_',
            search: '', 
            searchPlaceholder: 'Search Offer',
            paginate: { 
              previous: '<i class="fa-solid fa-chevron-left"></i>',
              next: '<i class="fa-solid fa-chevron-right"></i>'
            }
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
              extend: 'collection',
              className: 'btn btn-label-primary dropdown-toggle me-3',
              text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
              buttons: [
                {
                  extend: 'print',
                  text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                }
              ]
            },
            {
              className: "btn btn-primary me-2",
              text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Name</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Slug</a></li><li><a class="dropdown-item" href="#" data-column="5">Email</a></li><li><a class="dropdown-item" href="#" data-column="6">Role</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone</a></li><li><a class="dropdown-item" href="#" data-column="8">Company</a></li><li><a class="dropdown-item" href="#" data-column="9">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="10">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="11">User Offers</a></li><li><a class="dropdown-item" href="#" data-column="12">Traffic Urls</a></li><li><a class="dropdown-item" href="#" data-column="13">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="14">Browser</a></li><li><a class="dropdown-item" href="#" data-column="15">OS</a></li><li><a class="dropdown-item" href="#" data-column="16">Skype</a></li><li><a class="dropdown-item" href="#" data-column="17">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="18">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="19">Status</a></li><li><a class="dropdown-item" href="#" data-column="20">Email Verified</a></li><li><a class="dropdown-item" href="#" data-column="21">Created At</a></li></div></ul></div>',
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
        .catch((e) => {
          return e;
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

    attachEventListenersOfButton() {
      $("#data_tables_report_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        } 
      });
    },

    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    externalfilterreset(){
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          role_id : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          account_access : [],
          verified : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          role_id : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          account_access : [],
          verified : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          name : [],
          fname : [],
          lname : [],
          slug : [],
          email : [],
          phone_no : [],
          company_name : [],
          company_website : [],
          monthly_visitors : [],
          user_offers : [],
          traffic_urls : [],
          country_code : [],
          browser : [],
          os : [],
          skype : [],
          telegram : [],
          facebook : [],
          created_at : [],
      },
      this.checkfilter.selectedValues = {
          role_id : [],
          account_access : [],
          verified : [],
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
              this.globalVariables.apiUrl + "admin/export/search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#data_tables_report")) {
                const table = $("#data_tables_report").DataTable();
                table.clear();
                table.rows.add(data ?? []);
                table.draw();
              } else {
                var table = $('#data_tables_report').DataTable({
                    data: data,
                    columns: [
                        // { data: "0" },
                        { data: "id" },
                        { data: "name",
                          render: function (data, type, row) {
                            if (row?.name != null && row?.name != "") {
                              return '<span title="'+row?.name+'">'+row?.name+'</span>';
                            }
                            return '----------';
                          },
                        }, 
                        { data: "fname",
                          render: function (data, type, row) {
                            if (row?.fname != null && row?.fname  != "") {
                              return '<span title="'+row?.fname +'">'+row?.fname +'</span>';
                            }
                            return '----------';
                          },
                        },
                        { data: "lname",
                          render: function (data, type, row) {
                            if (row?.lname != null && row?.lname != "") {
                              return '<span title="'+row?.lname+'">'+row?.lname+'</span>';
                            }
                            return '----------';
                          },
                        }, 
                        { data: "slug",
                          render: function (data, type, row) {
                            if (row?.slug != null && row?.slug != "") {
                              return '<span title="'+row?.slug+'">'+row?.slug+'</span>';
                            }
                            return '----------';
                          },
                        }, 
                        { data: "email",
                          render: function (data, type, row) {
                            if (row?.email != null && row?.email != "") {
                              return '<span title="'+row?.email+'">'+row?.email+'</span>';
                            }
                            return '----------';
                          },
                        },  
                        { data: "role",
                          render: function (data, type, row) {
                            if (row?.role?.secondary_name != null && row?.role?.secondary_name != "") {
                              return '<span title="'+row?.role?.secondary_name+'">'+row?.role?.secondary_name+'</span>';
                            }
                            return '----------';
                          },
                        },  
                        { data: "phone_no",
                          render: function (data, type, row) {
                            if (row?.phone_no != null && row?.phone_no != "") {
                              return '<span title="'+row?.phone_no+'">'+row?.phone_no+'</span>';
                            }
                            return '----------';
                          },
                        }, 
                        { data: "company_name",
                          render: function (data, type, row) {
                            if (row['company_name'] != null && row['company_name'] != "") {
                              return '<span title="'+row['company_name']+'">'+row['company_name']+'</span>';
                            }
                            return '----------';
                          },
                        }, 
                        { data: "company_website",
                          render: function (data, type, row) {
                            if (row?.company_website != null && row?.company_website != "") {
                              return '<span title="'+row?.company_website+'">'+row?.company_website+'</span>';
                            }
                            return '----------';
                          },
                        },  
                        { data: "monthly_visitors",
                          render: function (data, type, row) {
                            if (row?.monthly_visitors != null && row?.monthly_visitors != "") {
                              return '<span title="'+row?.monthly_visitors+'">'+row?.monthly_visitors+'</span>';
                            }
                            return '----------';
                          },
                        },  
                        { data: "user_offers",
                          render: function (data, type, row) {
                            if (row?.user_offers != null && row?.user_offers != "") {
                              return '<span title="'+row?.user_offers+'">'+row?.user_offers+'</span>';
                            }
                            return '----------';
                          },
                        },  
                        { data: "traffic_urls",
                          render: function (data, type, row) {
                            if (row?.traffic_urls != null && row?.traffic_urls != "") {
                              return '<span title="'+row?.traffic_urls+'">'+row?.traffic_urls+'</span>';
                            }
                            return '----------';
                          },
                        },
                        { data: "country_code",
                          render: function (data, type, row) {
                            if (row?.country_code != null && row?.country_code != "") {
                              return '<span title="'+row?.country_code+'">'+row?.country_code+'</span>';
                            }
                            return '----------';
                          },
                        },  
                        { data: "browser",
                          render: function (data, type, row) {
                            if (row?.browser != null && row?.browser != "") {
                              return '<span title="'+row?.browser+'">'+row?.browser+'</span>';
                            }
                            return '----------';
                          },
                        },  
                        { data: "os",
                          render: function (data, type, row) {
                            if (row?.os != null && row?.os != "") {
                              return '<span title="'+row?.os+'">'+row?.os+'</span>';
                            }
                            return '----------';
                          },
                        },     
                        { data: "skype",
                          render: function (data, type, row) {
                            if (row?.skype != null && row?.skype != "") {
                              return '<span title="'+row?.skype+'">'+row?.skype+'</span>';
                            }
                            return '----------';
                          },
                        },     
                        { data: "telegram",
                          render: function (data, type, row) {
                            if (row?.telegram != null && row?.telegram != "") {
                              return '<span title="'+row?.telegram+'">'+row?.telegram+'</span>';
                            }
                            return '----------';
                          },
                        },     
                        { data: "facebook",
                          render: function (data, type, row) {
                            if (row?.facebook != null && row?.facebook != "") {
                              return '<span title="'+row?.facebook+'">'+row?.facebook+'</span>';
                            }
                            return '----------';
                          },
                        },     
                        { data: "status",
                          render: function (data, type, row) {
                            if (row?.account_access === 0) {
                              return '<span title="Pending" class="badge bg-warning">Pending</span>';
                            }
                            else if (row?.account_access === 1) {
                              return '<span title="Approved" class="badge bg-success">Approved</span>';
                            }
                            else if (row?.account_access === 2) {
                              return '<span title="Suspend" class="badge bg-danger">Suspend</span>';
                            }
                            else if (row?.account_access === 3) {
                              return '<span title="Unsuspend" class="badge bg-success">Unsuspend</span>';
                            }
                            else if (row?.account_access === 4) {
                              return '<span title="Pause" class="badge bg-info">Pause</span>';
                            }
                            else {
                              return '<span title="Resume" class="badge bg-success">Resume</span>';
                            }
                          },
                        },      
                        { data: "is_email_verified",
                          render: function (data, type, row) {
                            if (row?.is_email_verified != null) {
                              return '<span title="Verified" class="badge bg-success">Verified</span>';
                            }else {
                              return '<span title="Unverified" class="badge bg-danger">Unverified</span>';
                            }
                          },
                        },         
                        { data: "created_at",
                          render: function (data, type, row) {
                            if (row?.created_at != null && row?.created_at != "") {
                              return formateDate(row?.created_at);
                            }
                            return '----------';
                          },
                        },     
                        ],
                    initComplete: () => { 
                      $('#data_tables_report').wrap('<div class="commonDataTablesClass"></div>');
                      const table = $("#data_tables_report").DataTable();
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
                      this.attachEventListenersForSearch();
                      this.attachEventListenersOfButton();
                      this.attachEventListenersForMenu();
                      this.attachEventListenersBlulkAction();
                      this.attachEventListenersBlulkActionSubmit();

                      const searchInput = $("#data_tables_report_filter input");
                      searchInput.val(this.searchInputValue);
                      if(this.searchInputValue != ''){
                        searchInput.focus();
                      }
                      searchInput.off().on("keyup", (e) => {
                        const searchTerm = e.target.value;
                        this.searchInputValue = searchTerm;
                        this.getAdminUserExport(1, perPage, searchTerm);
                      });
                    },
                    // createdRow: function (row, data, dataIndex) {
                    //       $('td:eq(0)', row).html(dataIndex + 1);
                    // },
                    columnDefs: [
                      {
                        targets: 0,
                        orderable: false,
                        checkboxes: {
                          selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                        },
                        render: function (data, type, row) {
                          return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row?.id}">`;
                        },
                        searchable: false
                      },
                      {
                        targets: 9, 
                        visible: false,
                      },
                      {
                        targets: 10, 
                        visible: false,
                      },
                      {
                        targets: 11, 
                        visible: false,
                      },
                      {
                        targets: 12, 
                        visible: false,
                      },
                      {
                        targets: 13, 
                        visible: false,
                      },
                      {
                        targets: 14, 
                        visible: false,
                      },
                      {
                        targets: 15, 
                        visible: false,
                      },
                      {
                        targets: 16, 
                        visible: false,
                      },
                      {
                        targets: 17, 
                        visible: false,
                      },
                      {
                        targets: 18, 
                        visible: false,
                      },
                    ],
                    order: [[2, 'desc']],
                    dom: '<"row mx-2"' +
                      '<"col-md-4 px-0"f>' + 
                      '<"col-md-8 dopp_tb d-flex justify-content-end align-items-center"l<"button-wrapper"B>>' + 
                      '<"col-md-3 d-none"p>>' +
                      't' + 
                      '<"row mx-2"' +
                      '<"col-md-5 d-none"i>' + 
                      '<"col-md-7 d-none"p>>', 
                    displayLength: perPage, 
                    lengthMenu: [10, 20, 50, 100, 200], 
                    language: {
                      sLengthMenu: '_MENU_',
                      search: '', 
                      searchPlaceholder: 'Search Offer',
                      paginate: { 
                        previous: '<i class="fa-solid fa-chevron-left"></i>',
                        next: '<i class="fa-solid fa-chevron-right"></i>'
                      }
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
                        extend: 'collection',
                        className: 'btn btn-label-primary dropdown-toggle me-3',
                        text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                        buttons: [
                          {
                            extend: 'print',
                            text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                          },
                          {
                            extend: 'csv',
                            text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                          },
                          {
                            extend: 'excel',
                            text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                          },
                          {
                            extend: 'pdf',
                            text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                          },
                          {
                            extend: 'copy',
                            text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                            className: 'dropdown-item',
                            exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
                          }
                        ]
                      },
                      {
                            className: "btn btn-primary me-2",
                            text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Name</a></li><li><a class="dropdown-item" href="#" data-column="2">First Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Slug</a></li><li><a class="dropdown-item" href="#" data-column="5">Email</a></li><li><a class="dropdown-item" href="#" data-column="6">Role</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone</a></li><li><a class="dropdown-item" href="#" data-column="8">Company</a></li><li><a class="dropdown-item" href="#" data-column="9">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="10">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="11">User Offers</a></li><li><a class="dropdown-item" href="#" data-column="12">Traffic Urls</a></li><li><a class="dropdown-item" href="#" data-column="13">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="14">Browser</a></li><li><a class="dropdown-item" href="#" data-column="15">OS</a></li><li><a class="dropdown-item" href="#" data-column="16">Skype</a></li><li><a class="dropdown-item" href="#" data-column="17">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="18">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="19">Status</a></li><li><a class="dropdown-item" href="#" data-column="20">Created At</a></li></div></ul></div>',
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

    SearchValue(){
      this.getAdminUserExport();
    },

    attachEventListenersBlulkAction() {
      $('#data_tables_report').on('change', '.row-checkbox', (event) => {
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
      $('#data_tables_report thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#data_tables_report tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/export/users/bulk/delete",
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
                  this.getAdminUserExport();
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
      $("#data_tables_report_wrapper [name='data_tables_report_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getAdminUserExport(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#data_tables_report_wrapper #data_tables_report_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getAdminUserExport(1,10,getSearchValue);
      });
    },

  },
};
</script>
  <style>
#data_tables_report td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
#data_tables_report colgroup:nth-of-type(2) {
	display: none !important;
}
#data_tables_report .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
</style>