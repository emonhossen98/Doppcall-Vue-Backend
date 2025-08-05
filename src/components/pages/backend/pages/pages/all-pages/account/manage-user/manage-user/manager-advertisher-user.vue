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
                  <div class="card-header py-2">
                      <h5 class="card-title mb-0 mt-2">
                        Advertisers 
                      </h5>
                  </div>
                  <div class="card-body">
                      <div class="table-responsive-sm table-overflow-hidden">
                          <table class="align-middle mb-0 table table-hover" id="publishers_tables">
                              <thead>
                                  <tr>
                                    <th></th>
                                      <th>User Type</th>
                                      <th>Name</th>
                                      <th>First Name</th>
                                      <th>Last Name</th>
                                      <th>Slug</th>
                                      <th>Email</th>
                                      <th>Phone Number</th>
                                      <th>Company</th>
                                      <th>Company Website</th>
                                      <th>Monthly Visitors</th>
                                      <th>User Offers</th>
                                      <th>Traffic Urls</th>
                                      <th>Traffic Source</th>
                                      <th>Country Code</th>
                                      <th>Browser</th>
                                      <th>OS</th>
                                      <th>Skype</th>
                                      <th>Telegram</th>
                                      <th>Facebook</th>
                                      <th>Status</th>
                                      <th>Email Verified</th>
                                      <th>Created At</th>
                                      <th>Balance</th>
                                      <th>Manager</th>
                                      <th>City</th>
                                      <th>Country</th>
                                      <th width = "190px" id = "action-incompleted">Action</th>
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
                                    <li class="position-relative">
                                      <a :class="checkfilter.showcolumn == 'Balance' ? 'check-active' : ''"
                                        @click="clickFilters('balance', 'search', 'Balance')">Balance 
                                      </a>
                                      <template v-if="applyfillters.includes('Balance')">
                                        <span @click="removeSearch('Balance','balance','search')" id="remove-to-search-list">x</span>
                                      </template>
                                    </li>
                                    <li class="position-relative">
                                      <a :class="checkfilter.showcolumn == 'Manager' ? 'check-active' : ''"
                                        @click="clickFilters('account_manager_id', 'select', 'Manager')">Manager <i class="fa-solid fa-caret-down"></i> 
                                      </a>
                                      <template v-if="applyfillters.includes('Manager')">
                                        <span @click="removeSearch('Manager','account_manager_id','select')" id="remove-to-search-list">x</span>
                                      </template>
                                    </li>
                                    <li class="position-relative">
                                      <a :class="checkfilter.showcolumn == 'City' ? 'check-active' : ''"
                                        @click="clickFilters('city', 'search', 'City')">City 
                                      </a>
                                      <template v-if="applyfillters.includes('City')">
                                        <span @click="removeSearch('City','city','search')" id="remove-to-search-list">x</span>
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
                                      <a :class="checkfilter.showcolumn == 'Order By' ? 'check-active' : ''"
                                        @click="clickFilters('order_by', 'select', 'Order By')">Order By <i class="fa-solid fa-caret-down"></i> 
                                      </a>
                                      <template v-if="applyfillters.includes('Order By')">
                                        <span @click="removeSearch('Order By','order_by','select')" id="remove-to-search-list">x</span>
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
                                    <template v-if="checkfilter.showcolumn == 'Balance' && checkfilter.types.includes('search')"> 
                                      <div class="form-check mb-2">
                                        <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['balance']"
                                          type="checkbox" value="1" id="isemptyvalue">
                                        <label class="form-check-label" for="isemptyvalue">
                                          is Empty
                                        </label>
                                      </div>
                                      <div class="form-check mb-2">
                                        <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                          v-model="checkfilter.notemptyValues['balance']" type="checkbox" value="0" id="isnotemptyvalue">
                                        <label class="form-check-label" for="isnotemptyvalue">
                                          is not Empty
                                        </label>
                                      </div>
                                    </template>
                                    <template v-if="checkfilter.showcolumn == 'Manager' && checkfilter.types.includes('select')"> 
                                      <div class="form-check mb-2">
                                        <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['account_manager_id']"
                                          type="checkbox" value="0" id="isemptyvalue">
                                        <label class="form-check-label" for="isemptyvalue">
                                          is Empty
                                        </label>
                                      </div>
                                      <div class="form-check mb-2">
                                        <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                          v-model="checkfilter.notemptyValues['account_manager_id']" type="checkbox" value="" id="isnotemptyvalue">
                                        <label class="form-check-label" for="isnotemptyvalue">
                                          is not Empty
                                        </label>
                                      </div>
                                    </template>
                                    <template v-if="checkfilter.showcolumn == 'City' && checkfilter.types.includes('search')"> 
                                      <div class="form-check mb-2">
                                        <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['city']"
                                          type="checkbox" value="1" id="isemptyvalue">
                                        <label class="form-check-label" for="isemptyvalue">
                                          is Empty
                                        </label>
                                      </div>
                                      <div class="form-check mb-2">
                                        <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                          v-model="checkfilter.notemptyValues['city']" type="checkbox" value="0" id="isnotemptyvalue">
                                        <label class="form-check-label" for="isnotemptyvalue">
                                          is not Empty
                                        </label>
                                      </div>
                                    </template>
                                    <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('select')"> 
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
                                    <template v-if="checkfilter.showcolumn == 'Order By' && checkfilter.types.includes('select')"> 
                                      <div class="form-check mb-2">
                                        <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['order_by']"
                                          type="checkbox" value="1" id="isemptyvalue">
                                        <label class="form-check-label" for="isemptyvalue">
                                          is Empty
                                        </label>
                                      </div>
                                      <div class="form-check mb-2">
                                        <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                          v-model="checkfilter.notemptyValues['order_by']" type="checkbox" value="0" id="isnotemptyvalue">
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
                                        <template v-if="checkfilter.showcolumn == 'Balance' && checkfilter.types.includes('search')">
                                          <label for="filtertext">Contains</label>
                                          <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['balance']"
                                            class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                        </template>
                                        <template v-if="checkfilter.showcolumn == 'Manager' && checkfilter.types.includes('select')">
                                          <template v-if="accountManager?.length > 0">
                                              <template v-for="(manager,index) in accountManager" :key="index">
                                                <div class="form-check mb-2">
                                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['account_manager_id']" class="form-check-input" type="checkbox" :value="manager.id" :id="'dynamicid'+manager.id">
                                                  <label class="form-check-label" :for="'dynamicid'+manager.id">
                                                  {{ manager.fname }} {{ manager.lname }}
                                                  </label>
                                                </div>
                                              </template>
                                            </template>
                                        </template>
                                        <template v-if="checkfilter.showcolumn == 'City' && checkfilter.types.includes('search')">
                                          <label for="filtertext">Contains</label>
                                          <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['city']"
                                            class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                        </template>
                                        <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('search')">
                                          <label for="filtertext">Contains</label>
                                          <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['country']"
                                            class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                        </template>
                                        <template v-if="checkfilter.showcolumn == 'Order By' && checkfilter.types.includes('select')">
                                          <div class="form-check mb-2">
                                            <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['order_by']" class="form-check-input" type="checkbox" value="1" id="1">
                                            <label class="form-check-label" for="1">
                                              New
                                            </label>
                                          </div>
                                          <div class="form-check mb-2">
                                            <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['order_by']" class="form-check-input" type="checkbox" value="2" id="2">
                                            <label class="form-check-label" for="2">
                                              Old
                                            </label>
                                          </div>
                                        </template>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
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
       <!-- Large Modal -->
       <div class="modal fade" id="statusChangeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel3">{{ modalTitle }}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div>
                <p class="font-class">Please verify your Account</p>
              </div>

              <div class="form-group">
                <label for="note">Note (optional)</label>
                <textarea rows="3" cols="1" class="form-control" placeholder="Send a note...." v-model="modalData.note"  id="note"></textarea>
              </div>
              <div class="form-group mt-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" value="1" v-model="modalData.mailAction"/>
                  <label class="form-check-label" for="send-mail-btn">Send Mail</label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" @click="submiteModal()" class="btn btn-primary"><i class="fas fa-check fa-sm me-1"></i> Confirm</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Content wrapper -->
</template>
    <script>
  import axios from "axios";
  import toastr from "toastr";
  import Swal from "sweetalert2";
  import "toastr/build/toastr.min.css";
  import Loader from "../../../../../../include/loader.vue";
  import Breadcrumb from "../../../../../../include/breadcrumb.vue";
  import { inject } from "vue";
  import { fetchUserRoleAccountmanager } from "@/services/userServiceAccountmanager";
  import moment from "moment";
  
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
          { label: "Dashboard", url: "/account/dashboard" },
          { label: "Publishers", url: "" },
        ],
        getLoader: false,
        modalTitle : "",
        modalData: {
          data: "",
          action_type: "",
          email: " ",
          note: "",
          mailAction: "",
        },
        modalDisplay: "none",
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
          balance : [],
          account_manager_id : [],
          city : [],
          country : [],
          order_by : [],
        },
        notemptyValues : {
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
          account_access : [],
          verified : [],
          created_at : [],
          balance : [],
          account_manager_id : [],
          city : [],
          country : [],
          order_by : [],
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
          balance : [],
          city : [],
          country : [],
        },
        selectedValues: {
          account_access : [],
          verified : [],
          account_manager_id : [],
          order_by : [],
        },
      },
      applyfillters : [],
      accountManager : [],
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAccountmanager();
        if (role == 'Account manager') {
          this.getManagePublsihers();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#publishers_tables_wrapper .row.mx-2');
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
    methods: {
      getManagePublsihers() {
        this.getLoader = true;
        axios
          .get(this.globalVariables.apiUrl+"account-manager/manage/advertiser/get-data", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },  
          })
          .then((res) => {
            if ($.fn.DataTable.isDataTable("#publishers_tables")) {
            $('#publishers_tables').DataTable().destroy();
          }
          this.accountManager = res.data.accountManager;
          var formateDate = this.formatDates;
          var table = $('#publishers_tables').DataTable({
            data: res.data.getDatas,
            columns: [
          // { data: "1" }, 
          { data: "id" }, 
          { data: "role",
            render: function (data, type, row) {
              if (row?.role?.name != null && row?.role?.name != "") {
                return '<span class="badge bg-success">'+row?.role?.name+'</span>';
              }
              return '----------';
            },
          },
          { data: "name",
            render: function (data, type, row) {
              if (row?.name != null && row?.name != "") {
                  return row?.name; 
              }
              return '----------';
            },
          },
          { data: "fname",
            render: function (data, type, row) {
              if (row?.fname != null && row?.fname != "") {
                  return row?.fname;
              }
              return '----------';
            },
          },
          { data: "lname",
            render: function (data, type, row) {
              if (row?.lname != null && row?.lname != "") {
                  return row?.lname;
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
                  return row?.email;
              }
              return '----------';
            },
          },
          { data: "phone_no",
            render: function (data, type, row) {
              if (row?.convart_phone != null && row?.convart_phone != "") {
                  return row.convart_phone; 
              }
              return '----------';
            },
          },
          { data: "company_name",
            render: function (data, type, row) {
              if (row?.company_name != null && row?.company_name != "") {
                return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
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
          { data: "convart_traffic_source",
            render: function (data, type, row) {
              if (row?.convart_traffic_source != null && row?.convart_traffic_source != "") {
                return '<span title="'+row?.convart_traffic_source+'">'+row?.convart_traffic_source+'</span>';
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
          { data: "convart_status" }, 
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
          { data: "convart_balance" }, 
          { data: "convart_account_manager" }, 
          { data: "created_at",
          render: function (data, type, row) {
            if (row?.user_address?.city != null && row?.user_address?.city != "") {
              return '<span title="'+row?.user_address?.city+'">'+row?.user_address?.city+'</span>';
            }
            return '----------';
          },
          },
          { data: "created_at",
          render: function (data, type, row) {
            if (row?.user_address?.country  != null && row?.user_address?.country  != "") {
              return '<span title="'+row?.user_address?.country +'">'+row?.user_address?.country +'</span>';
            }
            return '----------';
          },
          },
          { data: "convart_action" }, 
        ],
            initComplete: () => {
              $('#publishers_tables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#publishers_tables").DataTable();
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
            },
            createdRow: function (row, data, dataIndex) {
                $('td:eq(0)', row).html(dataIndex + 1);
            },
            columnDefs: [
          {
            targets: 0,
            orderable: false,
            checkboxes: {
              selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
            },
            render: function (data, type, row) {
              return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
            },
            searchable: false
          },
          {
            targets: 2, 
            visible: false,
          },
          {
            targets: 4, 
            visible: false,
          },
          {
            targets: 5, 
            visible: false,
          },
          {
            targets: 8, 
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
            targets: 21, 
            visible: false,
          },
          {
            targets: 22, 
            visible: false,
          },
          {
            targets: 25, 
            visible: false,
          },
          {
            targets: 26, 
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
              '<"col-md-5"i>' + 
              '<"col-md-7"p>>', 
            displayLength: 10, 
            lengthMenu: [10, 20, 50, 100, 200], 
            language: {
              sLengthMenu: '_MENU_',
              search: '', 
              searchPlaceholder: 'Search Advertiser',
              paginate: { 
                previous: '<i class="fa-solid fa-chevron-left"></i>',
                next: '<i class="fa-solid fa-chevron-right"></i>'
              }
            },
            buttons: [
          {
            extend: 'collection',
            className: 'btn btn-label-primary dropdown-toggle me-3',
            text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
            buttons: [
              {
                extend: 'print',
                text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                className: 'dropdown-item',
                exportOptions: {columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
              },
              {
                extend: 'csv',
                text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                className: 'dropdown-item',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
              },
              {
                extend: 'excel',
                text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                className: 'dropdown-item',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
              },
              {
                extend: 'pdf',
                text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                className: 'dropdown-item',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
              },
              {
                extend: 'copy',
                text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                className: 'dropdown-item',
                exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
              }
            ]
          },
          {
            className: "btn btn-primary me-2",
            text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">User Type</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">First Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="5">Slug</a></li><li><a class="dropdown-item" href="#" data-column="6">Email</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="8">Company</a></li><li><a class="dropdown-item" href="#" data-column="9">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="10">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="11">User Offers</a></li><li><a class="dropdown-item" href="#" data-column="12">Traffic Urls</a></li><li><a class="dropdown-item" href="#" data-column="13">Traffic Source</a></li><li><a class="dropdown-item" href="#" data-column="14">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="15">Browser</a></li><li><a class="dropdown-item" href="#" data-column="16">OS</a></li><li><a class="dropdown-item" href="#" data-column="17">Skype</a></li><li><a class="dropdown-item" href="#" data-column="18">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="19">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="20">Status</a></li><li><a class="dropdown-item" href="#" data-column="21">Email Verified</a></li><li><a class="dropdown-item" href="#" data-column="22">Created At</a></li><li><a class="dropdown-item" href="#" data-column="23">Balance</a></li><li><a class="dropdown-item" href="#" data-column="24">Manager</a></li><li><a class="dropdown-item" href="#" data-column="25">City</a></li><li><a class="dropdown-item" href="#" data-column="26">Country</a></li><li><a class="dropdown-item" href="#" data-column="27">Action</a></li></div></ul></div>',
          },{
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
            console.log(error);
          })
          .finally(() => {
            this.getLoader = false;
          });
      },
  
    attachEventListeners() {
    $("#publishers_tables").on("click", ".dropdown-item", (event) => {
      const target = $(event.target);
      const dataId = target.data("id");
      const dataClass = target.attr("class");
      const dataEmail = target.data("email");

      if(dataClass === 'dropdown-item approved-btn align-items-center'){
        this.modalData.data = dataId;
        this.modalData.email = dataEmail;
        this.modalData.action_type = "approved",
        this.modalTitle = "Want to Approved";
        this.modalDisplay = "block";

      }else if(dataClass === 'dropdown-item pending-btn align-items-center'){
        this.modalData.data = dataId;
        this.modalData.email = dataEmail;
        this.modalData.action_type = "pending",
        this.modalTitle = "Want to Pending";
        this.modalDisplay = "block";

      }else if(dataClass === 'dropdown-item unsuspend-btn align-items-center'){
        this.modalData.data = dataId;
        this.modalData.email = dataEmail;
        this.modalData.action_type = "unsuspend",
        this.modalTitle = "Want to Unsuspend";
        this.modalDisplay = "block";

      }else if(dataClass === 'dropdown-item suspend-btn align-items-center'){
        this.modalData.data = dataId;
        this.modalData.email = dataEmail;
        this.modalData.action_type = "suspend",
        this.modalTitle = "Want to Suspend";
        this.modalDisplay = "block";

      }else if(dataClass === 'dropdown-item resume-btn align-items-center'){
        this.modalData.data = dataId;
        this.modalData.email = dataEmail;
        this.modalData.action_type = "resume",
        this.modalTitle = "Want to Resume";
        this.modalDisplay = "block";

      }else if(dataClass === 'dropdown-item pause-btn align-items-center'){
        this.modalData.data = dataId;
        this.modalData.email = dataEmail;
        this.modalData.action_type = "pause",
        this.modalTitle = "Want to Push";
        this.modalDisplay = "block";
      }else if(dataClass === "dropdown-item publisher-view align-items-center"){
        this.$router.push('/account-advertisher-view/'+dataId);
      }
    });
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
              balance : [],
              account_manager_id : [],
              city : [],
              country : [],
              order_by : [],
            },
            this.checkfilter.notemptyValues = {
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
              account_access : [],
              verified : [],
              created_at : [],
              balance : [],
              account_manager_id : [],
              city : [],
              country : [],
              order_by : [],
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
              balance : [],
              city : [],
              country : [],
            },
            this.checkfilter.selectedValues = {
              account_access : [],
              verified : [],
              account_manager_id : [],
              order_by : [],
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
              this.globalVariables.apiUrl + "account-manager/manage/advertiser-search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#publishers_tables")) {
                const table = $("#publishers_tables").DataTable();
                table.clear();
                table.rows.add(res.data.getDatas ?? []);
                table.draw();
              } else {
                var formateDate = this.formatDates;
                var table = $('#publishers_tables').DataTable({
                  data: res.data.getDatas,
                  columns: [
                  // { data: "1" }, 
                  { data: "id" }, 
                  { data: "role",
                    render: function (data, type, row) {
                      if (row?.role?.name != null && row?.role?.name != "") {
                        return '<span class="badge bg-success">'+row?.role?.name+'</span>';
                      }
                      return '----------';
                    },
                  },
                  { data: "name",
                    render: function (data, type, row) {
                      if (row?.name != null && row?.name != "") {
                          return row?.name; 
                      }
                      return '----------';
                    },
                  },
                  { data: "fname",
                    render: function (data, type, row) {
                      if (row?.fname != null && row?.fname != "") {
                          return row?.fname;
                      }
                      return '----------';
                    },
                  },
                  { data: "lname",
                    render: function (data, type, row) {
                      if (row?.lname != null && row?.lname != "") {
                          return row?.lname;
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
                          return row?.email;
                      }
                      return '----------';
                    },
                  },
                  { data: "phone_no",
                    render: function (data, type, row) {
                      if (row?.convart_phone != null && row?.convart_phone != "") {
                          return row.convart_phone; 
                      }
                      return '----------';
                    },
                  },
                  { data: "company_name",
                    render: function (data, type, row) {
                      if (row?.company_name != null && row?.company_name != "") {
                        return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
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
                  { data: "convart_traffic_source",
                    render: function (data, type, row) {
                      if (row?.convart_traffic_source != null && row?.convart_traffic_source != "") {
                        return '<span title="'+row?.convart_traffic_source+'">'+row?.convart_traffic_source+'</span>';
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
                  { data: "convart_status" }, 
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
                  { data: "convart_balance" }, 
                  { data: "convart_account_manager" }, 
                  { data: "created_at",
                  render: function (data, type, row) {
                    if (row?.user_address?.city != null && row?.user_address?.city != "") {
                      return '<span title="'+row?.user_address?.city+'">'+row?.user_address?.city+'</span>';
                    }
                    return '----------';
                  },
                  },
                  { data: "created_at",
                  render: function (data, type, row) {
                    if (row?.user_address?.country  != null && row?.user_address?.country  != "") {
                      return '<span title="'+row?.user_address?.country +'">'+row?.user_address?.country +'</span>';
                    }
                    return '----------';
                  },
                  },
                  { data: "convart_action" }, 
                ],
                  initComplete: () => {
                    $('#publishers_tables').wrap('<div class="commonDataTablesClass"></div>');
                    const table = $("#publishers_tables").DataTable();
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
                  },
                  createdRow: function (row, data, dataIndex) {
                      $('td:eq(0)', row).html(dataIndex + 1);
                  },
                  columnDefs: [
                  {
                    targets: 0,
                    orderable: false,
                    checkboxes: {
                      selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                    },
                    render: function (data, type, row) {
                      return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                    },
                    searchable: false
                  },
                  {
                    targets: 2, 
                    visible: false,
                  },
                  {
                    targets: 4, 
                    visible: false,
                  },
                  {
                    targets: 5, 
                    visible: false,
                  },
                  {
                    targets: 8, 
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
                    targets: 21, 
                    visible: false,
                  },
                  {
                    targets: 22, 
                    visible: false,
                  },
                  {
                    targets: 25, 
                    visible: false,
                  },
                  {
                    targets: 26, 
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
                    '<"col-md-5"i>' + 
                    '<"col-md-7"p>>', 
                  displayLength: 10, 
                  lengthMenu: [10, 20, 50, 100, 200], 
                  language: {
                    sLengthMenu: '_MENU_',
                    search: '', 
                    searchPlaceholder: 'Search Publisher',
                    paginate: { 
                      previous: '<i class="fa-solid fa-chevron-left"></i>',
                      next: '<i class="fa-solid fa-chevron-right"></i>'
                    }
                  },
                  buttons: [
                  {
                    extend: 'collection',
                    className: 'btn btn-label-primary dropdown-toggle me-3',
                    text: '<i class="ti ti-screen-share me-1 ti-xs"></i>Export',
                    buttons: [
                      {
                        extend: 'print',
                        text: '<i class="ti ti-printer me-1 ti-xs text-primary"></i>Print',
                        className: 'dropdown-item',
                        exportOptions: {columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
                      },
                      {
                        extend: 'csv',
                        text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
                      },
                      {
                        extend: 'excel',
                        text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
                      },
                      {
                        extend: 'pdf',
                        text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
                      },
                      {
                        extend: 'copy',
                        text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                        className: 'dropdown-item',
                        exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26] }
                      }
                    ]
                  },
                  {
                    className: "btn btn-primary me-2",
                    text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">User Type</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">First Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="5">Slug</a></li><li><a class="dropdown-item" href="#" data-column="6">Email</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="8">Company</a></li><li><a class="dropdown-item" href="#" data-column="9">Company Website</a></li><li><a class="dropdown-item" href="#" data-column="10">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="11">User Offers</a></li><li><a class="dropdown-item" href="#" data-column="12">Traffic Urls</a></li><li><a class="dropdown-item" href="#" data-column="13">Traffic Source</a></li><li><a class="dropdown-item" href="#" data-column="14">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="15">Browser</a></li><li><a class="dropdown-item" href="#" data-column="16">OS</a></li><li><a class="dropdown-item" href="#" data-column="17">Skype</a></li><li><a class="dropdown-item" href="#" data-column="18">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="19">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="20">Status</a></li><li><a class="dropdown-item" href="#" data-column="21">Email Verified</a></li><li><a class="dropdown-item" href="#" data-column="22">Created At</a></li><li><a class="dropdown-item" href="#" data-column="23">Balance</a></li><li><a class="dropdown-item" href="#" data-column="24">Manager</a></li><li><a class="dropdown-item" href="#" data-column="25">City</a></li><li><a class="dropdown-item" href="#" data-column="26">Country</a></li><li><a class="dropdown-item" href="#" data-column="27">Action</a></li></div></ul></div>',
                  },{
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
  
    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    // Account Access Settings
    submiteModal() {
          this.getLoader = true;
          axios
            .post(
              this.globalVariables.apiUrl+"account-manager/manage/user/account-access",
              this.modalData,
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              if(res.data.status == 'success'){
                this.getManagePublsihers();
                this.callToNext();
                toastr.success(res.data.message);
                const modalElement = document.getElementById('statusChangeModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                if(modal){
                  modal.hide();
                }
              }else{
                toastr.error(res.data.message);
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              this.getLoader = false;
            });
    }, 

    callToNext(){
      this.$nextTick(() => {
        const dataTableWrapper = document.querySelectorAll('#publishers_tables_wrapper .row.mx-2');
        if (dataTableWrapper.length > 0) {
          dataTableWrapper[0].style.display = 'none';
          dataTableWrapper[1].style.display = 'none';
        }
      });
    },


    attachEventListenersOfButton() {
      $("#publishers_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        } 
      });
    },
    },
  };
  </script>
<style>
  #dropdownMenuButton {
	background: transparent;
}
  #publishers_tables colgroup:nth-of-type(2) {
      display: none !important;
  }
  #publishers_tables .dt-checkboxes-cell{
      padding: 0.7rem 0.5rem !important;
  }
  .country-flagofPhone {
	width: 15%;
}
  </style>