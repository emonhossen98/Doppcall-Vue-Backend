<template>
    <div v-if="getLoader">
      <Loader></Loader>
    </div>
    <!-- Content wrapper -->
    <div class="content-wrapper">
      <!-- Content -->
      <div class="container-fluid flex-grow-1 container-p-y">
        <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
        <div class="row row-sm mt-4">
          <div class="col-12">
            <div class="card">
              <div class="card-header d-flex align-items-center justify-content-between mb-0 mt-2">
                <h5 class="card-title">User Activities</h5>
              </div>
              <div class="user-activities-table card-body">
                <table class="table table-sm" id="user_active_tables">
                  <thead>
                    <tr>					
                      <!-- <th></th> -->
                      <th></th>
                      <th>Sl</th>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>Role</th>
                      <th>Browser</th>
                      <th>OS</th>
                      <th>User Agent</th>
                      <th>Monthly Visitors</th>
                      <th>Company Name</th>
                      <th>Company Website</th>
                      <th>Country Code</th>
                      <th>Traffic URL</th>
                      <th>Facebook</th>
                      <th>Skype</th>
                      <th>Telegram</th>
                      <th>Page Name</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                  </tbody>
                </table>
                <div id="externalFilters" v-if="showHiddenExternalFilter">
                      <div>
                        <div class="row">
                          <div class="d-flex justify-content-between align-items-center border-bottom py-3 px-4">
                            <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span
                                  class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template>
                            </h5>
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
                                  <span @click="removeSearch('Name', 'name', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'First Name' ? 'check-active' : ''"
                                  @click="clickFilters('fname', 'search', 'First Name')">First Name
                                </a>
                                <template v-if="applyfillters.includes('First Name')">
                                  <span @click="removeSearch('First Name', 'fname', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Last Name' ? 'check-active' : ''"
                                  @click="clickFilters('lname', 'search', 'Last Name')">Last Name
                                </a>
                                <template v-if="applyfillters.includes('Last Name')">
                                  <span @click="removeSearch('Last Name', 'lname', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Email' ? 'check-active' : ''"
                                  @click="clickFilters('email', 'search', 'Email')">Email
                                </a>
                                <template v-if="applyfillters.includes('Email')">
                                  <span @click="removeSearch('Email', 'email', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Phone Number' ? 'check-active' : ''"
                                  @click="clickFilters('phone_no', 'search', 'Phone Number')">Phone Number
                                </a>
                                <template v-if="applyfillters.includes('Phone Number')">
                                  <span @click="removeSearch('Phone Number', 'phone_no', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Role' ? 'check-active' : ''"
                                  @click="clickFilters('role_id', 'select', 'Role')">Role <i class="fa-solid fa-caret-down"></i> 
                                </a>
                                <template v-if="applyfillters.includes('Role')">
                                  <span @click="removeSearch('Role', 'role_id', 'select')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Browser' ? 'check-active' : ''"
                                  @click="clickFilters('browser', 'search', 'Browser')">Browser 
                                </a>
                                <template v-if="applyfillters.includes('Browser')">
                                  <span @click="removeSearch('Browser', 'browser', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'OS' ? 'check-active' : ''"
                                  @click="clickFilters('os', 'search', 'OS')">OS 
                                </a>
                                <template v-if="applyfillters.includes('OS')">
                                  <span @click="removeSearch('OS', 'os', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Monthly Visitors' ? 'check-active' : ''"
                                  @click="clickFilters('monthly_visitors', 'search', 'Monthly Visitors')">Monthly Visitors
                                </a>
                                <template v-if="applyfillters.includes('Monthly Visitors')">
                                  <span @click="removeSearch('Monthly Visitors', 'monthly_visitors', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Company Name' ? 'check-active' : ''"
                                  @click="clickFilters('company_name', 'search', 'Company Name')">Company Name
                                </a>
                                <template v-if="applyfillters.includes('Company Name')">
                                  <span @click="removeSearch('Company Name', 'company_name', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Company Website' ? 'check-active' : ''"
                                  @click="clickFilters('company_website', 'search', 'Company Website')">Company Website
                                </a>
                                <template v-if="applyfillters.includes('Company Website')">
                                  <span @click="removeSearch('Company Website', 'company_website', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Country Code' ? 'check-active' : ''"
                                  @click="clickFilters('country_code', 'search', 'Country Code')">Country Code
                                </a>
                                <template v-if="applyfillters.includes('Country Code')">
                                  <span @click="removeSearch('Country Code', 'country_code', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Traffic Urls' ? 'check-active' : ''"
                                  @click="clickFilters('traffic_urls', 'search', 'Traffic Urls')">Traffic Urls
                                </a>
                                <template v-if="applyfillters.includes('Traffic Urls')">
                                  <span @click="removeSearch('Traffic Urls', 'traffic_urls', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Facebook' ? 'check-active' : ''"
                                  @click="clickFilters('facebook', 'search', 'Facebook')">Facebook
                                </a>
                                <template v-if="applyfillters.includes('Facebook')">
                                  <span @click="removeSearch('Facebook', 'facebook', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Skype' ? 'check-active' : ''"
                                  @click="clickFilters('skype', 'search', 'Skype')">Skype
                                </a>
                                <template v-if="applyfillters.includes('Skype')">
                                  <span @click="removeSearch('Skype', 'skype', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Telegram' ? 'check-active' : ''"
                                  @click="clickFilters('telegram', 'search', 'Telegram')">Telegram
                                </a>
                                <template v-if="applyfillters.includes('Telegram')">
                                  <span @click="removeSearch('Telegram', 'telegram', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Page Name' ? 'check-active' : ''"
                                  @click="clickFilters('page_name', 'search', 'Page Name')">Page Name
                                </a>
                                <template v-if="applyfillters.includes('Page Name')">
                                  <span @click="removeSearch('Page Name', 'page_name', 'search')"
                                    id="remove-to-search-list">x</span>
                                </template>
                              </li>
                            </ul>
                          </div>
                          <div class="col-md-6 ps-4">
                            <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                              <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                              <template v-if="checkfilter.showcolumn == 'Name' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['name']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['name']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['fname']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['fname']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['lname']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['lname']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['email']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['email']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['phone_no']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['phone_no']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('select')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['role_id']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['role_id']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Browser' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['browser']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['browser']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'OS' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['os']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['os']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Monthly Visitors' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['monthly_visitors']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['monthly_visitors']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['company_name']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['company_name']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Company Website' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['company_website']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['company_website']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Country Code' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['country_code']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['country_code']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Traffic Urls' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['traffic_urls']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['traffic_urls']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Facebook' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['facebook']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['facebook']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Skype' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['skype']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['skype']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['fnmae']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['fnmae']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Telegram' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['telegram']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['telegram']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Page Name' && checkfilter.types.includes('search')">
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.emptyValues['page_name']" type="checkbox" value="1"
                                    id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['page_name']" type="checkbox" value="0"
                                    id="isnotemptyvalue">
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
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['name']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['fname']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['lname']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['email']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['phone_no']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Role' && checkfilter.types.includes('search')">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['role_id']" class="form-check-input" type="checkbox" value="3" id="dynamicidstatus3">
                                      <label class="form-check-label" for="dynamicidstatus3">
                                        Publisher
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['role_id']" class="form-check-input" type="checkbox" value="2" id="dynamicidstatus2">
                                      <label class="form-check-label" for="dynamicidstatus2">
                                        Advertiser
                                      </label>
                                    </div>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Browser' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['browser']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'OS' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['os']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Monthly Visitors' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['monthly_visitors']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['company_name']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Company Website' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['company_website']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Country Code' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['country_code']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Traffic Urls' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['traffic_urls']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Facebook' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['facebook']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Skype' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['skype']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Telegram' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['telegram']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Page Name' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)"
                                      v-model="checkfilter.searchValues['page_name']" class="form-control mb-2"
                                      id="filtertext" placeholder="Search here..">
                                  </template>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
                <div class="row justify-content-between align-items-center px-3 pb-3">
                  <div class="col-md-3">
                    Showing {{ startPage }} to {{ endPage }} of {{ recordsTotal }} entries
                  </div>
                  <div class="pagination-controls col-md-9 d-flex justify-content-end align-items-center ">
                    <ul class="pagination mb-0">
                      <!-- Previous Button -->
                      <li class="paginate_button page-item previous" :class="{ disabled: currentPage === 1 }">
                        <button class="page-link" @click="getresentUserActivites(currentPage - 1)" :disabled="currentPage === 1" >
                          <i class="fa-solid fa-chevron-left"></i>
                        </button>
                      </li>

                      <!-- Page Numbers -->
                      <template v-for="page in paginationPages" :key="page">
                        <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                          <button class="page-link" @click="getresentUserActivites(page)">
                            {{ page }}
                          </button>
                        </li>
                      </template>

                      <!-- Next Button -->
                      <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                        <button  class="page-link" @click="getresentUserActivites(currentPage + 1)" :disabled="currentPage === lastPage">
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
  import Loader from '../../../../include/loader.vue';
  import Breadcrumb from '../../../../include/breadcrumb.vue';
  import moment from 'moment';
  import { inject } from "vue";
  import { fetchUserRole } from "@/services/userService";
  
  export default {
    setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
    components:{
      Loader,
      Breadcrumb,
    },
    data() {
      return {    
        breadcrumbs: [
          { label: "Dashboard", url: "/dashboard" },
          { label: " User Activities", url: "" },
        ],
        getLoader: false,
        currentPage: 1,
        lastPage: 1,
        recordsTotal : 0,
        startPage : 0,
        endPage : 0,
        searchInputValue : "",
        showHiddenExternalFilter: false,
        checkfilter: {
        columns: ['name'],
        showcolumn: "Name",
        types: ['search'],
        emptyValues: {
          name : [],
          fname : [],
          lname : [],
          email : [],
          phone_no : [],
          role_id : [],
          browser : [],
          os : [],
          monthly_visitors : [],
          company_name : [],
          company_website : [],
          country_code : [],
          traffic_urls : [],
          facebook : [],
          skype : [],
          telegram : [],
          page_name : [],
        },
        notemptyValues: {
          name : [],
          fname : [],
          lname : [],
          email : [],
          phone_no : [],
          role_id : [],
          browser : [],
          os : [],
          monthly_visitors : [],
          company_name : [],
          company_website : [],
          country_code : [],
          traffic_urls : [],
          facebook : [],
          skype : [],
          telegram : [],
          page_name : [],
        },
        searchValues: {
          name : [],
          fname : [],
          lname : [],
          email : [],
          phone_no : [],
          browser : [],
          os : [],
          monthly_visitors : [],
          company_name : [],
          company_website : [],
          country_code : [],
          traffic_urls : [],
          facebook : [],
          skype : [],
          telegram : [],
          page_name : [],
        },
        selectedValues: {
          role_id : [],
        },
      },
      applyfillters: [],
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getresentUserActivites();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#user_active_tables_wrapper .row.mx-2');
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
       getresentUserActivites(page = 1, perPage = 10,searchValue = '') 
       {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"admin/user/activities/get-data", {
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

            if ($.fn.DataTable.isDataTable("#user_active_tables")) {
              $('#user_active_tables').DataTable().destroy();
            }
            var formateDate = this.formatDates;
            var table = $('#user_active_tables').DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: "convart_avatar" },
              { data: "name" },
              { data: "fname" },
              { data: "lname" },
              { data: "email" },
              { data: "phone_number" },
              { data: "role.name" },
              { data: 'browser',
                render: function (data, type, row) {
                if (row?.browser != null) {
                  return '<span title="'+row?.browser+'">'+row?.browser+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'os',
                render: function (data, type, row) {
                if (row?.os != null) {
                  return '<span title="'+row?.os+'">'+row?.os+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'user_agent',
                render: function (data, type, row) {
                if (row?.user_agent != null) {
                  return '<span title="'+row?.user_agent+'">'+row?.user_agent+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'monthly_visitors',
                render: function (data, type, row) {
                if (row?.monthly_visitors != null) {
                  return '<span title="'+row?.monthly_visitors+'">'+row?.monthly_visitors+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'company_name',
                render: function (data, type, row) {
                if (row?.company_name != null) {
                  return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'company_website',
                render: function (data, type, row) {
                if (row?.company_website != null) {
                  return '<span title="'+row?.company_website+'">'+row?.company_website+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'country_code',
                render: function (data, type, row) {
                if (row?.country_code != null) {
                  return '<span title="'+row?.country_code+'">'+row?.country_code+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'traffic_urls',
                render: function (data, type, row) {
                if (row?.traffic_urls != null) {
                  return '<span title="'+row?.traffic_urls+'">'+row?.traffic_urls+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'facebook',
                render: function (data, type, row) {
                if (row?.facebook != null) {
                  return '<span title="'+row?.facebook+'">'+row?.facebook+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'skype',
                render: function (data, type, row) {
                if (row?.skype != null) {
                  return '<span title="'+row?.skype+'">'+row?.skype+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'telegram',
                render: function (data, type, row) {
                if (row?.telegram != null) {
                  return '<span title="'+row?.telegram+'">'+row?.telegram+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'page_name',
                render: function (data, type, row) {
                if (row?.page_name != null) {
                  return '<span title="'+row?.page_name+'">'+row?.page_name+'</span>';
                }
                  return '----------';
                },
              },
              {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
              { data: '' }
            ],
            initComplete: () => { 
              $('#user_active_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#user_active_tables").DataTable();
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

              const searchInput = $("#user_active_tables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getresentUserActivites(1, perPage, searchTerm);
              });
            },
            createdRow: function (row, data, dataIndex) {
              const perPage = 10; 
              const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
              $('td:eq(1)', row).html(rowNumber);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">'
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                },
                searchable: false
              },
              {
                targets: 3, 
                visible: false,
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
              {
                targets: 19, 
                visible: false,
              },
              {
                targets: 20, 
                visible: false,
              },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return '<div class="activit_action d-flex align-items-center"><button type="button" id="view_btn" class="btn-style-edit text-success me-2 d-flex  align-items-center" data-id=' + full.id + '><i  id="view_btn"  class="fas fa-eye" data-id=' + full.id + '></i></button></div>'; 
                }
              }
            ],
            order: [[1, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4"f>' + 
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
              searchPlaceholder: 'Search Activities',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Avatar</a></li><li><a class="dropdown-item" href="#" data-column="3">Name</a></li><li><a class="dropdown-item" href="#" data-column="4">First Name</a></li><li><a class="dropdown-item" href="#" data-column="5">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="6">Email</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="8">Role</a></li><li><a class="dropdown-item" href="#" data-column="9">Browser</a></li><li><a class="dropdown-item" href="#" data-column="10">OS</a></li><li><a class="dropdown-item" href="#" data-column="11">User Agent</a></li><li><a class="dropdown-item" href="#" data-column="12">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="13">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="14">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="15">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="16">Traffic URL</a></li><li><a class="dropdown-item" href="#" data-column="17">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="18">Skype</a></li><li><a class="dropdown-item" href="#" data-column="19">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="20">Page Name</a></li><li><a class="dropdown-item" href="#" data-column="21">Created At</a></li><li><a class="dropdown-item" href="#" data-column="22">Action</a></li></div></ul></div>',
                },
                {
                text:
                  '<span id="all_filters" class="all_filters"><i class="fa-solid fa-magnifying-glass me-1"></i>All Filters</span>',
                className: "btn btn-primary",
                attr: { id: "all_filters"},
              },
            ],
          });
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
          this.getLoader = false;
        });
       },

    externalfilterreset(){
      this.checkfilter.columns = ['domain'],
      this.checkfilter.showcolumn = "Domain",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
      },
      this.checkfilter.notemptyValues = {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
      },
      this.checkfilter.searchValues = {
        ip_address : [],
        country : [],
        domain : [],
        allow_date : [],
      },
      this.checkfilter.selectedValues = {
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
              this.globalVariables.apiUrl + "admin/user/activities/search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#user_active_tables")) {
                const table = $("#user_active_tables").DataTable();
                table.clear();
                table.rows.add(data ?? []);
                table.draw();
              } else {
                var formateDate = this.formatDates;
                var table = $('#user_active_tables').DataTable({
            data: data,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              { data: 'id' },
              { data: "convart_avatar" },
              { data: "name" },
              { data: "fname" },
              { data: "lname" },
              { data: "email" },
              { data: "phone_number" },
              { data: "role.name" },
              { data: 'browser',
                render: function (data, type, row) {
                if (row?.browser != null) {
                  return '<span title="'+row?.browser+'">'+row?.browser+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'os',
                render: function (data, type, row) {
                if (row?.os != null) {
                  return '<span title="'+row?.os+'">'+row?.os+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'user_agent',
                render: function (data, type, row) {
                if (row?.user_agent != null) {
                  return '<span title="'+row?.user_agent+'">'+row?.user_agent+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'monthly_visitors',
                render: function (data, type, row) {
                if (row?.monthly_visitors != null) {
                  return '<span title="'+row?.monthly_visitors+'">'+row?.monthly_visitors+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'company_name',
                render: function (data, type, row) {
                if (row?.company_name != null) {
                  return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'company_website',
                render: function (data, type, row) {
                if (row?.company_website != null) {
                  return '<span title="'+row?.company_website+'">'+row?.company_website+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'country_code',
                render: function (data, type, row) {
                if (row?.country_code != null) {
                  return '<span title="'+row?.country_code+'">'+row?.country_code+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'traffic_urls',
                render: function (data, type, row) {
                if (row?.traffic_urls != null) {
                  return '<span title="'+row?.traffic_urls+'">'+row?.traffic_urls+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'facebook',
                render: function (data, type, row) {
                if (row?.facebook != null) {
                  return '<span title="'+row?.facebook+'">'+row?.facebook+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'skype',
                render: function (data, type, row) {
                if (row?.skype != null) {
                  return '<span title="'+row?.skype+'">'+row?.skype+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'telegram',
                render: function (data, type, row) {
                if (row?.telegram != null) {
                  return '<span title="'+row?.telegram+'">'+row?.telegram+'</span>';
                }
                  return '----------';
                },
              },
              { data: 'page_name',
                render: function (data, type, row) {
                if (row?.page_name != null) {
                  return '<span title="'+row?.page_name+'">'+row?.page_name+'</span>';
                }
                  return '----------';
                },
              },
              {
                data: "created_at",
                render: function (data, type, row) {
                  if (row.created_at != null) {
                    return formateDate(row.created_at);
                  }
                  return "--------";
                },
              },
              { data: '' }
            ],
            initComplete: () => { 
              $('#user_active_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#user_active_tables").DataTable();
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

              const searchInput = $("#user_active_tables_filter input");
              searchInput.val(this.searchInputValue);
              if(this.searchInputValue != ''){
                  searchInput.focus();
              }

              searchInput.off().on("keyup", (e) => {
                const searchTerm = e.target.value;
                this.searchInputValue = searchTerm;
                this.getresentUserActivites(1, perPage, searchTerm);
              });
            },
            createdRow: function (row, data, dataIndex) {
              const perPage = 10; 
              const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
              $('td:eq(1)', row).html(rowNumber);
            },
            columnDefs: [
              {
                targets: 0,
                orderable: false,
                checkboxes: {
                  selectAllRender: '<input type="checkbox" class="form-check-input">'
                },
                render: function () {
                  return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                },
                searchable: false
              },
              {
                targets: 3, 
                visible: false,
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
              {
                targets: 19, 
                visible: false,
              },
              {
                targets: 20, 
                visible: false,
              },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return '<div class="activit_action d-flex align-items-center"><button type="button" id="view_btn" class="btn-style-edit text-success me-2 d-flex  align-items-center" data-id=' + full.id + '><i  id="view_btn"  class="fas fa-eye" data-id=' + full.id + '></i></button></div>'; 
                }
              }
            ],
            order: [[1, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4"f>' + 
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
              searchPlaceholder: 'Search Activities',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Avatar</a></li><li><a class="dropdown-item" href="#" data-column="3">Name</a></li><li><a class="dropdown-item" href="#" data-column="4">First Name</a></li><li><a class="dropdown-item" href="#" data-column="5">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="6">Email</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="8">Role</a></li><li><a class="dropdown-item" href="#" data-column="9">Browser</a></li><li><a class="dropdown-item" href="#" data-column="10">OS</a></li><li><a class="dropdown-item" href="#" data-column="11">User Agent</a></li><li><a class="dropdown-item" href="#" data-column="12">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="13">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="14">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="15">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="16">Traffic URL</a></li><li><a class="dropdown-item" href="#" data-column="17">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="18">Skype</a></li><li><a class="dropdown-item" href="#" data-column="19">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="20">Page Name</a></li><li><a class="dropdown-item" href="#" data-column="21">Created At</a></li><li><a class="dropdown-item" href="#" data-column="22">Action</a></li></div></ul></div>',
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

    attachEventListenersOfButton(){
      $("#user_active_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }
      });
    },


    getRoleData(event,page = 1, perPage = 10,searchValue = '') {
    if(event.target.value == 0){
        this.getresentUserActivites();
    }else{
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+`admin/user/activities/get-data/${event.target.value}`, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          params: { page: page, perPage: perPage,search: searchValue},
        })
        .then((res) => {
          const { data, current_page, last_page,recordsTotal } = res.data;
          console.log(data)
          this.currentPage = current_page;
          this.lastPage = last_page;
          this.recordsTotal = recordsTotal;

          this.startPage = (current_page - 1) * perPage + 1;
          this.endPage = Math.min(current_page * perPage, recordsTotal);

          if ($.fn.DataTable.isDataTable("#user_active_tables")) {
            $('#user_active_tables').DataTable().destroy();
          }
          var formateDate = this.formatDates;
          var table = $('#user_active_tables').DataTable({
          data: data,
          columns: [
            // { data: 'id' },
            { data: 'id' },
            { data: 'id' },
            { data: "convart_avatar" },
            { data: "convart_name" },
            { data: "email" },
            { data: "phone_number" },
            { data: "role.name" },
            { data: '' }
          ],
          initComplete: () => { 
            $('#user_active_tables').wrap('<div class="commonDataTablesClass"></div>');
            const table = $("#user_active_tables").DataTable();
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
            this.attachEventListenersForMenu();
            this.attachEventListenersForSearch();

            const searchInput = $("#user_active_tables_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
                searchInput.focus();
            }

            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getresentUserActivites(1, perPage, searchTerm);
            });
          },
          createdRow: function (row, data, dataIndex) {
            const perPage = 10; 
            const rowNumber = (dataIndex + 1) + (page - 1) * perPage;
            $('td:eq(1)', row).html(rowNumber);
          },
          columnDefs: [
            {
              targets: 0,
              orderable: false,
              checkboxes: {
                selectAllRender: '<input type="checkbox" class="form-check-input">'
              },
              render: function () {
                return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
              },
              searchable: false
            },
            
            {
              targets: -1,
              title: 'Actions',
              searchable: false,
              orderable: false,
              render: function (data, type, full, meta) {
                return '<div class="activit_action d-flex align-items-center"><button type="button" id="view_btn" class="btn-style-edit text-success me-2 d-flex  align-items-center" data-id=' + full.id + '><i  id="view_btn"  class="fas fa-eye" data-id=' + full.id + '></i></button></div>'; 
              }
            }
          ],
          order: [[1, 'desc']],
          dom: '<"row mx-2"' +
            '<"col-md-4"f>' + 
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
            searchPlaceholder: 'Search Activities',
            paginate: { 
              previous: '<i class="fa-solid fa-chevron-left"></i>',
              next: '<i class="fa-solid fa-chevron-right"></i>'
            }
          },
          buttons: [
            {
              className: "btn btn-primary",
              text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">SL</a></li><li><a class="dropdown-item" href="#" data-column="2">Avatar</a></li><li><a class="dropdown-item" href="#" data-column="3">Full Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Email</a></li><li><a class="dropdown-item" href="#" data-column="5">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="6">Role</a></li><li><a class="dropdown-item" href="#" data-column="7">Action</a></li></div></ul></div>',
            },
          ],
        });
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
        this.getLoader = false;
      });
      }
    },

    attachEventListeners() {
      $("#user_active_tables").on("click", ".activit_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
        if (dataClass === "view_btn") {
          this.$router.push('/dashboard-user-activitie-view/'+dataId);
        }
      });
    },
    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },
    attachEventListenersForMenu() {
      $("#user_active_tables_wrapper [name='user_active_tables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getresentUserActivites(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#user_active_tables_wrapper #user_active_tables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getresentUserActivites(1,10,getSearchValue);
      });
    },
    },
  };
  </script>
  
  <style>
.country-flag {
	width: 20%;
}
#user_active_tables colgroup:nth-of-type(2) {
	display: none !important;
}
.avatar-img {
	width: 50px;
	height: 50px;
	border-radius: 500%;
}
.text-success {
	background: transparent !important;
}
</style>
  
