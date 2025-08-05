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
          <div class="col-md-12">
            <div class="card  mt-4">
              <div  class="card-header py-2">
                <h5 class="card-title d-flex align-items-center mb-0 payment_info_title mt-2">Publisher Payment Info</h5>
              </div>
              <div class="card-body">
                <table class="align-middle mb-0 table table-hover" id="payment_infos_table">
                  <thead>
                    <tr>
                      <!-- <th></th> -->
                      <th></th>
                      <th>Account Holder Name</th>
                      <th>Account Number</th>
                      <th>Bank Account Type</th>
                      <th>Bank Location</th>
                      <th>Bank Name</th>
                      <th>Email Address</th>
                      <th>Phone Number</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Payment Type</th>
                      <th>Address</th>
                      <th>Created At</th>
                      <th>Status</th>
                      <th style="width: 5%">Action</th>
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
                            <a :class="checkfilter.showcolumn == 'Account Holder Name' ? 'check-active' : ''"
                              @click="clickFilters('account_holder_name', 'search', 'Account Holder Name')">Account Holder Name 
                            </a>
                            <template v-if="applyfillters.includes('Account Holder Name')">
                              <span @click="removeSearch('Account Holder Name','account_holder_name','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Account Number' ? 'check-active' : ''"
                              @click="clickFilters('account_number', 'search', 'Account Number')">Account Number 
                            </a>
                            <template v-if="applyfillters.includes('Account Number')">
                              <span @click="removeSearch('Account Number','account_number','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Bank Account Type' ? 'check-active' : ''"
                              @click="clickFilters('bank_account_type', 'select', 'Bank Account Type')">Bank Account Type <i class="fa-solid fa-caret-down"></i> 
                            </a>
                            <template v-if="applyfillters.includes('Bank Account Type')">
                              <span @click="removeSearch('Bank Account Type','bank_account_type','select')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Bank Location' ? 'check-active' : ''"
                              @click="clickFilters('bank_location', 'search', 'Bank Location')">Bank Location 
                            </a>
                            <template v-if="applyfillters.includes('Bank Location')">
                              <span @click="removeSearch('Bank Location','bank_location','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Bank Name' ? 'check-active' : ''"
                              @click="clickFilters('bank_name', 'search', 'Bank Name')">Bank Name 
                            </a>
                            <template v-if="applyfillters.includes('Bank Name')">
                              <span @click="removeSearch('Bank Name','bank_name','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Email Address' ? 'check-active' : ''"
                              @click="clickFilters('email_address', 'search', 'Email Address')">Email Address 
                            </a>
                            <template v-if="applyfillters.includes('Email Address')">
                              <span @click="removeSearch('Email Address','email_address','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Phone Number' ? 'check-active' : ''"
                              @click="clickFilters('phone_number', 'search', 'Phone Number')">Phone Number 
                            </a>
                            <template v-if="applyfillters.includes('Phone Number')">
                              <span @click="removeSearch('Phone Number','phone_number','search')" id="remove-to-search-list">x</span>
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
                            <a :class="checkfilter.showcolumn == 'State' ? 'check-active' : ''"
                              @click="clickFilters('state', 'search', 'State')">State 
                            </a>
                            <template v-if="applyfillters.includes('State')">
                              <span @click="removeSearch('State','state','search')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Payment Type' ? 'check-active' : ''"
                              @click="clickFilters('payment_type', 'select', 'Payment Type')">Payment Type <i class="fa-solid fa-caret-down"></i> 
                            </a>
                            <template v-if="applyfillters.includes('Payment Type')">
                              <span @click="removeSearch('Payment Type','payment_type','select')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                          <li class="position-relative">
                            <a :class="checkfilter.showcolumn == 'Address' ? 'check-active' : ''"
                              @click="clickFilters('address', 'search', 'Address')">Address 
                            </a>
                            <template v-if="applyfillters.includes('Address')">
                              <span @click="removeSearch('Address','address','search')" id="remove-to-search-list">x</span>
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
                            <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                              @click="clickFilters('status', 'select', 'Status')">Status <i class="fa-solid fa-caret-down"></i> 
                            </a>
                            <template v-if="applyfillters.includes('Status')">
                              <span @click="removeSearch('Status','status','select')" id="remove-to-search-list">x</span>
                            </template>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-6 ps-4">
                        <div v-if="checkfilter.showcolumn != null && checkfilter.showcolumn != ''">
                          <p class="mt-3 mb-1 font-class">{{ checkfilter.showcolumn ?? '' }}</p>
                          <template v-if="checkfilter.showcolumn == 'Account Holder Name' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['account_holder_name']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['account_holder_name']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Account Number' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['account_number']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['account_number']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Bank Account Type' && checkfilter.types.includes('select')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['bank_account_type']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['bank_account_type']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Bank Location' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['bank_location']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['bank_location']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Bank Name' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['bank_name']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['bank_name']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Email Address' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['email_address']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['email_address']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['phone_number']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['phone_number']" type="checkbox" value="0" id="isnotemptyvalue">
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
                          <template v-if="checkfilter.showcolumn == 'State' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['state']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['state']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Payment Type' && checkfilter.types.includes('select')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['payment_type']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['payment_type']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <template v-if="checkfilter.showcolumn == 'Address' && checkfilter.types.includes('search')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['address']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['address']" type="checkbox" value="0" id="isnotemptyvalue">
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
                          <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')"> 
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['status']"
                                type="checkbox" value="1" id="isemptyvalue">
                              <label class="form-check-label" for="isemptyvalue">
                                is Empty
                              </label>
                            </div>
                            <div class="form-check mb-2">
                              <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                v-model="checkfilter.notemptyValues['status']" type="checkbox" value="0" id="isnotemptyvalue">
                              <label class="form-check-label" for="isnotemptyvalue">
                                is not Empty
                              </label>
                            </div>
                          </template>
                          <div>
                            <p>Have value</p>
                            <div>
                              <template v-if="checkfilter.showcolumn == 'Account Holder Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['account_holder_name']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Account Number' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['account_number']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Bank Account Type' && checkfilter.types.includes('select')">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['bank_account_type']" class="form-check-input" type="checkbox" value="Business Account" id="dynamicidstatus0">
                                      <label class="form-check-label" for="dynamicidstatus0">
                                        Business Account
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['bank_account_type']" class="form-check-input" type="checkbox" value="Personal Account" id="dynamicidstatus1">
                                      <label class="form-check-label" for="dynamicidstatus1">
                                        Personal Account
                                      </label>
                                    </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Bank Location' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['bank_location']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Bank Name' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['bank_name']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Email Address' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['email_address']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Phone Number' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['phone_number']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'City' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['city']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'State' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['state']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Payment Type' && checkfilter.types.includes('select')">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['payment_type']" class="form-check-input" type="checkbox" value="1" id="dynamicidstatus1">
                                      <label class="form-check-label" for="dynamicidstatus1">
                                        Payoneer
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['payment_type']" class="form-check-input" type="checkbox" value="2" id="dynamicidstatus2">
                                      <label class="form-check-label" for="dynamicidstatus2">
                                        Bank Draft
                                      </label>
                                    </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Address' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['address']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Created At' && checkfilter.types.includes('search')">
                                <label for="filtertext">Contains</label>
                                <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['created_at']"
                                  class="form-control mb-2" id="filtertext" placeholder="Search here..">
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="0" id="dynamicidstatus0">
                                      <label class="form-check-label" for="dynamicidstatus0">
                                        Pending
                                      </label>
                                    </div>
                                    <div class="form-check mb-2">
                                      <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="1" id="dynamicidstatus1">
                                      <label class="form-check-label" for="dynamicidstatus1">
                                        Approved
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
      
  
  
    <!-- Large Modal -->
    <div class="modal fade" id="showPaymentInfo" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="showPaymentInfoLabel">Payment Setting Informations</h5>
            <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="card card-body border-0 p-0">
                <table class="table table-sm table-hover table-bordered">
                  <tr class="py-3 px-2">
                        <td class="font-weight-bold">Account Holder Name :</td>
                        <td id="account_holder_name_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Phone Number :</td>
                        <td id="phone_number_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Email :</td>
                        <td id="email_address_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Payment Type :</td>
                        <td id="payment_type_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Bank Location :</td>
                        <td id="bank_location_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Bank Account Type :</td>
                        <td id="bank_account_type_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Bank Name :</td>
                        <td id="bank_name_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Account Number :</td>
                        <td id="account_number_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Routing Number :</td>
                        <td id="routing_number_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Branch Number :</td>
                        <td id="branch_number_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">IBAN Code :</td>
                        <td id="iban_code_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">SWIFT/BIC Code :</td>
                        <td id="swift_bic_code_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">IFSC Code :</td>
                        <td id="ifsc_code_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Account Type :</td>
                        <td id="account_type_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Address :</td>
                        <td id="address_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">City :</td>
                        <td id="city_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">State :</td>
                        <td id="state_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Zip Code :</td>
                        <td id="zip_code_show"></td>
                    </tr>
                    <tr>
                        <td class="font-weight-bold">Country :</td>
                        <td id="country_show"></td>
                    </tr>
                </table>
            </div>
        </div>
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
  import Loader from '../../../../../../include/loader.vue';
  import Breadcrumb from '../../../../../../include/breadcrumb.vue';
  import { inject } from "vue";
  import { fetchUserRoleAccountmanager } from "@/services/userServiceAccountmanager";
  import moment from "moment";
  
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
          { label: "Dashboard", url: "/account/dashboard" },
          { label: "Publisher Payment Info ", url: "" },
        ],
        getLoader: false,
        paymentViewData : {
          id : "",
        },
        showHiddenExternalFilter: false,
        checkfilter: {
        columns: ['account_holder_name'],
        showcolumn: "Account Holder Name",
        types : ['search'],
        emptyValues : {
          account_holder_name : [],
          account_number : [],
          bank_account_type : [],
          bank_location : [],
          bank_name : [],
          email_address : [],
          phone_number : [],
          city : [],
          state : [],
          payment_type : [],
          address : [],
          created_at : [],
          status : [],
        },
        notemptyValues : {
          account_holder_name : [],
          account_number : [],
          bank_account_type : [],
          bank_location : [],
          bank_name : [],
          email_address : [],
          phone_number : [],
          city : [],
          state : [],
          payment_type : [],
          address : [],
          created_at : [],
          status : [],
        },
        searchValues : {
          account_holder_name : [],
          account_number : [],
          bank_location : [],
          bank_name : [],
          email_address : [],
          phone_number : [],
          city : [],
          state : [],
          address : [],
          created_at : [],
        },
        selectedValues: {
          bank_account_type : [],
          payment_type : [],
          status : [],
        },
      },
      applyfillters : [],
      };
    },
    async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRoleAccountmanager();
        if (role == 'Account manager') {
          this.getPublisherPaymentInfo();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#payment_infos_table_wrapper .row.mx-2');
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
    getPublisherPaymentInfo() {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"account-manager/payment/system/user/get-data", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if ($.fn.DataTable.isDataTable("#payment_infos_table")) {
          $('#payment_infos_table').DataTable().destroy();
        }
        var formateDate = this.formatDates;
        var table = $('#payment_infos_table').DataTable({
          data: res.data,
          columns: [
            { data: 'id' },
            {
              data: "account_holder_name",
              render: function (data, type, row) {
                if (row.account_holder_name != null) {
                  return '<span title="'+row.account_holder_name+'">'+row.account_holder_name.length > 15 
                    ? row.account_holder_name.slice(0, 15) + '...'  
                    : row.account_holder_name+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "account_number",
              render: function (data, type, row) {
                if (row.account_number != null) {
                  return '<span title="'+row.account_number+'">'+row.account_number.length > 15 
                    ? row.account_number.slice(0, 15) + '...'  
                    : row.account_number+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "bank_account_type",
              render: function (data, type, row) {
                if (row.bank_account_type != null) {
                  return '<span title="'+row.bank_account_type+'">'+row.bank_account_type.length > 15 
                    ? row.bank_account_type.slice(0, 15) + '...'  
                    : row.bank_account_type+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "bank_location",
              render: function (data, type, row) {
                if (row.bank_location != null) {
                  return '<span title="'+row.bank_location+'">'+row.bank_location.length > 15 
                    ? row.bank_location.slice(0, 15) + '...'  
                    : row.bank_location+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "bank_name",
              render: function (data, type, row) {
                if (row.bank_name != null) {
                  return '<span title="'+row.bank_name+'">'+row.bank_name.length > 15 
                    ? row.bank_name.slice(0, 15) + '...'  
                    : row.bank_name+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "email_address",
              render: function (data, type, row) {
                if (row.email_address != null) {
                  return '<span title="'+row.email_address+'">'+row.email_address.length > 15 
                    ? row.email_address.slice(0, 15) + '...'  
                    : row.email_address+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "phone_number",
              render: function (data, type, row) {
                if (row.phone_number != null) {
                  return '<span title="'+row.phone_number+'">'+row.phone_number.length > 15 
                    ? row.phone_number.slice(0, 15) + '...'  
                    : row.phone_number+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "city",
              render: function (data, type, row) {
                if (row.city != null) {
                  return '<span title="'+row.city+'">'+row.city.length > 15 
                    ? row.city.slice(0, 15) + '...'  
                    : row.city+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "state",
              render: function (data, type, row) {
                if (row.state != null) {
                  return '<span title="'+row.state+'">'+row.state.length > 15 
                    ? row.state.slice(0, 15) + '...'  
                    : row.state+'</span>' ; 
                }
                return '----------';
              },
            },
            {
              data: "payment_type",
              render: function (data, type, row) {
                  if(row.payment_type == 1){
                      return 'Payoneer';
                  }else{
                      return 'Bank Draft';
                  }
              },
            },
            {
              data: "address",
              render: function (data, type, row) {
                if (row.address != null) {
                  return '<span title="'+row.address+'">'+row.address.length > 15 
                    ? row.address.slice(0, 15) + '...'  
                    : row.address+'</span>' ; 
                }
                return '----------';
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
            {
              data: "user.status",
              render: function (data, type, row) {
                  if (row.status == 1) {
                      return '<span class="badge badge-sm bg-success">Approved</span>';
                  }
                  else {
                      return '<span class="badge badge-sm bg-danger">Pending</span>';
                  }
              },
            },
            {
              data: "user.status",
              render: function (data, type, row) {
                  return '<button type="button" class="dropdown-item payment-view" id="payment_show_btn" data-id="'+row.id+'" data-bs-toggle="modal" data-bs-target="#showPaymentInfo"><i id="payment_show_btn" data-id="'+row.id+'" class="fa-regular fa-eye me-1 text-success"></i></button>';
              },
            },
          ],
          initComplete: () => {
            $('#payment_infos_table').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#payment_infos_table").DataTable();
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
                selectAllRender: '<input type="checkbox" class="form-check-input">'
              },
              render: function () {
                return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
              },
              searchable: false
            },
            {
              targets: 1, 
              visible: false,
            },
            {
              targets: 3, 
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
              targets: 11, 
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
            searchPlaceholder: 'Search Payment Info',
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
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                }
              ]
            },
            {
                className: "btn btn-primary me-2",
                text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Account Holder Name</a></li><li><a class="dropdown-item" href="#" data-column="2">Account Number</a></li><li><a class="dropdown-item" href="#" data-column="3">Bank Account Type</a></li><li><a class="dropdown-item" href="#" data-column="4">Bank Location</a></li><li><a class="dropdown-item" href="#" data-column="5">Bank Name</a></li><li><a class="dropdown-item" href="#" data-column="6">Email Address</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="8">City</a></li><li><a class="dropdown-item" href="#" data-column="9">State</a></li><li><a class="dropdown-item" href="#" data-column="10">Payment Type</a></li><li><a class="dropdown-item" href="#" data-column="11">Address</a></li><li><a class="dropdown-item" href="#" data-column="12">Created At</a></li><li><a class="dropdown-item" href="#" data-column="13">Status</a></li><li><a class="dropdown-item" href="#" data-column="14">Action</a></li></div></ul></div>',
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

    externalfilterreset(){
          this.checkfilter.columns = ['name'],
          this.checkfilter.showcolumn = "Name",
          this.checkfilter.types = ['search'],
          this.checkfilter.emptyValues = {
            account_holder_name : [],
            account_number : [],
            bank_account_type : [],
            bank_location : [],
            bank_name : [],
            email_address : [],
            phone_number : [],
            city : [],
            state : [],
            payment_type : [],
            address : [],
            created_at : [],
            status : [],
          },
          this.checkfilter.notemptyValues = {
            account_holder_name : [],
            account_number : [],
            bank_account_type : [],
            bank_location : [],
            bank_name : [],
            email_address : [],
            phone_number : [],
            city : [],
            state : [],
            payment_type : [],
            address : [],
            created_at : [],
            status : [],
          },
          this.checkfilter.searchValues = {
            account_holder_name : [],
            account_number : [],
            bank_location : [],
            bank_name : [],
            email_address : [],
            phone_number : [],
            city : [],
            state : [],
            address : [],
            created_at : [],
          },
          this.checkfilter.selectedValues = {
            bank_account_type : [],
            payment_type : [],
            status : [],
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
              this.globalVariables.apiUrl + "account-manager/payment/system/search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#payment_infos_table")) {
                const table = $("#payment_infos_table").DataTable();
                table.clear();
                table.rows.add(res.data ?? []);
                table.draw();
              } else {
                var formateDate = this.formatDates;
                var table = $('#payment_infos_table').DataTable({
                  data: res.data,
                  columns: [
                    { data: 'id' },
                    {
                      data: "account_holder_name",
                      render: function (data, type, row) {
                        if (row.account_holder_name != null) {
                          return '<span title="'+row.account_holder_name+'">'+row.account_holder_name.length > 15 
                            ? row.account_holder_name.slice(0, 15) + '...'  
                            : row.account_holder_name+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "account_number",
                      render: function (data, type, row) {
                        if (row.account_number != null) {
                          return '<span title="'+row.account_number+'">'+row.account_number.length > 15 
                            ? row.account_number.slice(0, 15) + '...'  
                            : row.account_number+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "bank_account_type",
                      render: function (data, type, row) {
                        if (row.bank_account_type != null) {
                          return '<span title="'+row.bank_account_type+'">'+row.bank_account_type.length > 15 
                            ? row.bank_account_type.slice(0, 15) + '...'  
                            : row.bank_account_type+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "bank_location",
                      render: function (data, type, row) {
                        if (row.bank_location != null) {
                          return '<span title="'+row.bank_location+'">'+row.bank_location.length > 15 
                            ? row.bank_location.slice(0, 15) + '...'  
                            : row.bank_location+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "bank_name",
                      render: function (data, type, row) {
                        if (row.bank_name != null) {
                          return '<span title="'+row.bank_name+'">'+row.bank_name.length > 15 
                            ? row.bank_name.slice(0, 15) + '...'  
                            : row.bank_name+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "email_address",
                      render: function (data, type, row) {
                        if (row.email_address != null) {
                          return '<span title="'+row.email_address+'">'+row.email_address.length > 15 
                            ? row.email_address.slice(0, 15) + '...'  
                            : row.email_address+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "phone_number",
                      render: function (data, type, row) {
                        if (row.phone_number != null) {
                          return '<span title="'+row.phone_number+'">'+row.phone_number.length > 15 
                            ? row.phone_number.slice(0, 15) + '...'  
                            : row.phone_number+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "city",
                      render: function (data, type, row) {
                        if (row.city != null) {
                          return '<span title="'+row.city+'">'+row.city.length > 15 
                            ? row.city.slice(0, 15) + '...'  
                            : row.city+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "state",
                      render: function (data, type, row) {
                        if (row.state != null) {
                          return '<span title="'+row.state+'">'+row.state.length > 15 
                            ? row.state.slice(0, 15) + '...'  
                            : row.state+'</span>' ; 
                        }
                        return '----------';
                      },
                    },
                    {
                      data: "payment_type",
                      render: function (data, type, row) {
                          if(row.payment_type == 1){
                              return 'Payoneer';
                          }else{
                              return 'Bank Draft';
                          }
                      },
                    },
                    {
                      data: "address",
                      render: function (data, type, row) {
                        if (row.address != null) {
                          return '<span title="'+row.address+'">'+row.address.length > 15 
                            ? row.address.slice(0, 15) + '...'  
                            : row.address+'</span>' ; 
                        }
                        return '----------';
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
                    {
                      data: "user.status",
                      render: function (data, type, row) {
                          if (row.status == 1) {
                              return '<span class="badge badge-sm bg-success">Approved</span>';
                          }
                          else {
                              return '<span class="badge badge-sm bg-danger">Pending</span>';
                          }
                      },
                    },
                    {
                      data: "user.status",
                      render: function (data, type, row) {
                          return '<button type="button" class="dropdown-item payment-view" id="payment_show_btn" data-id="'+row.id+'" data-bs-toggle="modal" data-bs-target="#showPaymentInfo"><i id="payment_show_btn" data-id="'+row.id+'" class="fa-regular fa-eye me-1 text-success"></i></button>';
                      },
                    },
                  ],
                  initComplete: () => {
                    $('#payment_infos_table').wrap('<div class="commonDataTablesClass"></div>');
                      const table = $("#payment_infos_table").DataTable();
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
                        selectAllRender: '<input type="checkbox" class="form-check-input">'
                      },
                      render: function () {
                        return '<input type="checkbox" class="dt-checkboxes form-check-input" >';
                      },
                      searchable: false
                    },
                    {
                      targets: 1, 
                      visible: false,
                    },
                    {
                      targets: 3, 
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
                      targets: 11, 
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
                    searchPlaceholder: 'Search Payment Info',
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
                          exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        },
                        {
                          extend: 'csv',
                          text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                          className: 'dropdown-item',
                          exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        },
                        {
                          extend: 'excel',
                          text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                          className: 'dropdown-item',
                          exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        },
                        {
                          extend: 'pdf',
                          text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                          className: 'dropdown-item',
                          exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        },
                        {
                          extend: 'copy',
                          text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                          className: 'dropdown-item',
                          exportOptions: { columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        }
                      ]
                    },
                    {
                        className: "btn btn-primary me-2",
                        text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Account Holder Name</a></li><li><a class="dropdown-item" href="#" data-column="2">Account Number</a></li><li><a class="dropdown-item" href="#" data-column="3">Bank Account Type</a></li><li><a class="dropdown-item" href="#" data-column="4">Bank Location</a></li><li><a class="dropdown-item" href="#" data-column="5">Bank Name</a></li><li><a class="dropdown-item" href="#" data-column="6">Email Address</a></li><li><a class="dropdown-item" href="#" data-column="7">Phone Number</a></li><li><a class="dropdown-item" href="#" data-column="8">City</a></li><li><a class="dropdown-item" href="#" data-column="9">State</a></li><li><a class="dropdown-item" href="#" data-column="10">Payment Type</a></li><li><a class="dropdown-item" href="#" data-column="11">Address</a></li><li><a class="dropdown-item" href="#" data-column="12">Created At</a></li><li><a class="dropdown-item" href="#" data-column="13">Status</a></li><li><a class="dropdown-item" href="#" data-column="14">Action</a></li></div></ul></div>',
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
  
    formatDates(date) {
      return moment(date).format('D MMMM YYYY');
    },

    attachEventListeners() {
      $('#payment_infos_table').on('click', '#payment_show_btn', (event) => {
        const target = $(event.target);
        const dataId = target.data('id');
        const dataClass = target.attr('id');
          if(dataClass === 'payment_show_btn'){
          this.getLoader = true;
          this.paymentViewData.id = dataId;
          axios
            .post(this.globalVariables.apiUrl+"account-manager/payment/system/user/view", this.paymentViewData, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              document.querySelector('#account_holder_name_show').innerHTML = res.data.account_holder_name ?? '';
              document.querySelector('#phone_number_show').innerHTML = res.data.phone_number ?? '';
              document.querySelector('#email_address_show').innerHTML = res.data.email_address ?? '';
              if(res.data.payment_type == 1){
                document.querySelector('#payment_type_show').innerHTML = 'Payoneer';
              }else{
                document.querySelector('#payment_type_show').innerHTML = 'Bank Draft'
              }
              document.querySelector('#bank_location_show').innerHTML = res.data.bank_location ?? '';
              document.querySelector('#bank_account_type_show').innerHTML = res.data.bank_account_type ?? '';
              document.querySelector('#bank_name_show').innerHTML = res.data.bank_name ?? '';
              document.querySelector('#account_number_show').innerHTML = res.data.account_number ?? '';
              document.querySelector('#routing_number_show').innerHTML = res.data.routing_number ?? '';
              document.querySelector('#branch_number_show').innerHTML = res.data.branch_number ?? '';
              document.querySelector('#iban_code_show').innerHTML = res.data.iban_code ?? '';
              document.querySelector('#swift_bic_code_show').innerHTML = res.data.swift_bic_code ?? '';
              document.querySelector('#ifsc_code_show').innerHTML = res.data.ifsc_code ?? '';
              document.querySelector('#account_type_show').innerHTML = res.data.account_type ?? '';
              document.querySelector('#address_show').innerHTML = res.data.address ?? '';
              document.querySelector('#city_show').innerHTML = res.data.city ?? '';
              document.querySelector('#state_show').innerHTML = res.data.state ?? '';
              document.querySelector('#zip_code_show').innerHTML = res.data.zip_code ?? '';
              document.querySelector('#country_show').innerHTML = res.data.country ?? '';
            })
            .catch((e) => {
              return e;
            })
            .finally(()=> {
              this.getLoader = false;
            });
        }
      });
    },

    attachEventListenersOfButton() {
      $("#payment_infos_table_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        } 
      });
    },
    },
  }
  </script>
  
  <style>
  #payment_infos_table .dropdown-item{
      display: flex !important;
      align-items: center !important;
  }
  #payment_infos_table colgroup:nth-of-type(2) {
      display: none !important;
  }
  #payment_infos_table .dt-checkboxes-cell{
      padding: 0.7rem 0.5rem !important;
  }
  #dropdownMenuButton {
      background: transparent;
  }
  </style>
  <style scoped>
  .modal-dialog {
      width: 60% !important;
  }
  .modal.is-active {
      padding-top: 18rem;
  }
  .font-weight-bold {
    font-weight: 700;
  }
  #showPaymentInfo table td {
    padding : 10px 25px !important;
  }
  </style> 
  