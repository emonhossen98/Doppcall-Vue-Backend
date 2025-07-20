<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- {{ publishers }} -->
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-12">
          <div class="card">
            <div class="card-header pt-3 pb-1">
              <h5 class="card-title d-flex align-items-center justify-content-between mb-0 mt-2">
                Payment - Publishers
              </h5>
            </div>
            <div class="card-body">
              <table class="align-middle mb-0 table table-hover" id="publisher_datatables">
                <thead>
                  <!-- <th></th> -->
                  <th></th>
                  <!-- <th>SL</th> -->
                  <th width="20%">Company</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th width="15%">Balance</th>
                  <th>Browser</th>
                  <th>Country Code</th>
                  <th>Monthly Visitors</th>
                  <th>os</th>
                  <th>Telegram</th>
                  <th>Facebook</th>
                  <th>Skype</th>
                  <th>User Agent</th>
                  <th>Created At</th>
                  <th  id="action-incompleted">Action</th>
                  <th  id="action-incompleted">History</th>
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
                      <button class="page-link" @click="getPublishers(currentPage - 1)" :disabled="currentPage === 1" >
                        <i class="fa-solid fa-chevron-left"></i>
                      </button>
                    </li>

                    <!-- Page Numbers -->
                    <template v-for="page in paginationPages" :key="page">
                      <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                        <button class="page-link" @click="getPublishers(page)">
                          {{ page }}
                        </button>
                      </li>
                    </template>

                    <!-- Next Button -->
                    <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                      <button  class="page-link" @click="getPublishers(currentPage + 1)" :disabled="currentPage === lastPage">
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
  </div>

<!-- Large Modal -->
  <div class="modal fade" id="addPaymentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex align-items-center w-100 payment-type">
            <button type="button" id="deposit-button" :class="{ depositactive: depositButtonActive }" @click="changePaymentType('deposit')" class="btn btn-outline deposit w-50 rounded-0 btn-md py-2" data-name="deposit">
              Add Balance
            </button>
            <button type="button" id="withdraw-button" :class="{ withdrawactive: withdrawButtonActive }" @click="changePaymentType('withdraw')"  class="btn btn-outline withdraw w-50 rounded-0 py-2" data-name="withdraw">
              Withdraw
            </button>
          </div>
          <button type="button"  class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="form-group">
              <label for="user_name" class="required mb-1">User</label>
              <select v-model="publiserDepositeData.user_name" id="user_name" class="select2 form-select" required>
                <option value="">Select Please</option>
                <option  v-for="user in publishers.publisher" :value="user.id" :key="user.id">
                  {{ user.fname }} - {{ user.company_name }} - {{ user.email }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                  <label for="payment_date" class="required mb-1">Payment Date</label>
                  <input  type="date"  v-model="publiserDepositeData.payment_date" id="payment_date" class="form-control" required />
                  <div v-if="validationErrors && validationErrors.payment_date" class="text-danger">
                      {{ validationErrors.payment_date[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="date_range" class="required mb-1">Date Range</label>
                  <input type="text" v-model="publiserDepositeData.date_range" id="date_range" class="form-control" required placeholder="Enter Date Range"/>
                  <div v-if="validationErrors &&  validationErrors.date_range" class="text-danger">
                      {{ validationErrors.date_range[0] }}
                  </div>
                </div>
              </div>
          </div>

          <div class="row mt-3">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="" class="mb-1">Upload File</label>
                  <input  type="file" @change="handleImageUpload" class="form-control"/>
                </div>
              </div>
          </div>

          <div class="row mt-3">
            <div class="col-md-6">
                <div class="form-group">
                  <label for="calls" class="mb-1">Total Billable Calls</label>
                  <input type="text" v-model="publiserDepositeData.calls" id="calls" class="form-control" required placeholder="Enter Total Billable Calls"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="amount" class="required mb-1">Amount</label>
                  <input  type="number" v-model="publiserDepositeData.amount" required id="amount" class="form-control" placeholder="Enter Amount">
                  <div v-if="validationErrors &&  validationErrors.amount" class="text-danger">
                      {{ validationErrors.amount[0] }}
                  </div>
                </div>
              </div>
          </div>

          <div class="row mt-3">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="note_for_admin" class="mb-1">Note for admin</label><br />
                  <textarea  v-model="publiserDepositeData.note_for_admin" id="note_for_admin" cols="60" rows="3" class="form-control" placeholder="Enter Admin Note"></textarea>
                </div>
              </div>
          </div>

          <div class="row mt-3">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="payment_method" class="required mb-1">Payment Method</label>
                  <select v-model="publiserDepositeData.payment_method" id="payment_method" required class="form-select">
                    <option value="">Select Payment Method</option>
                    <option value="4">Payoneer</option>
                    <option value="1">Bank Transfer</option>
                    <option value="3">Other</option>
                  </select>
                  <div v-if="validationErrors && validationErrors.payment_method" class="text-danger">
                      {{ validationErrors.payment_method[0] }}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="status" class="required mb-1">Status</label>
                  <select v-model="publiserDepositeData.status" id="status" required class="form-select">
                    <option value="">Select Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <div v-if="validationErrors &&  validationErrors.status" class="text-danger">
                      {{ validationErrors.status[0] }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form-group note-textarea mt-3">
              <label for="note" class="mb-1">Payment Method Note (optional)</label><br />
              <textarea  v-model="publiserDepositeData.note"  id="note" cols="30" rows="3" placeholder="Send a note...."  class="form-control" ></textarea>
            </div>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-label-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button  @click="AddedDepositeValue()" type="button" class="btn btn-primary"><i class="fas fa-check fa-sm me-2"></i> Confirm</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Content wrapper -->
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Swal from "sweetalert2";
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
  props: ["publishers"],
  components: {
    Loader,
    Breadcrumb,
  },
  data: () => {
    return {
      showModal: false,
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Publishers Payment Info", url: "" },
      ],
      depositButtonActive: true,
      withdrawButtonActive: false,
      publiserDepositeData: {
        payment_name: "deposit",
        user_id: "select-user-payment",
        update_data: "update_data",
        user_name: "",
        payment_date: "",
        date_range: "",
        calls: "",
        amount: "",
        note_for_admin: "",
        payment_method: "",
        status: "",
        note: "",
        upload_file: "",
      },
      bulkactionids : {
        selectedIds: [],
        role_id: 3,
      },
      validationErrors: null,
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
        role_type: 3,
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
          country_code : [],
          browser : [],
          os : [],
          created_at : [],
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
          country_code : [],
          browser : [],
          os : [],
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
          country_code : [],
          browser : [],
          os : [],
          created_at : [],
        },
        selectedValues: {

        },
      },
      applyfillters : [],
    };
  },
  async mounted() { 
    try {
      const { role, isAuthorized } = await fetchUserRole();
      if (role == 'Super' || role == 'Admin') {
        this.getLoader = true;
        this.getPublishers();
        this.$nextTick(() => {
          const dataTableWrapper = document.querySelectorAll('#publisher_datatables_wrapper .row.mx-2');
          if (dataTableWrapper.length > 0) {
            dataTableWrapper[0].style.display = 'none';
            dataTableWrapper[1].style.display = 'none';
          }
        });
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[data-vue-route]');
      if (target) {
        e.preventDefault();
        const route = target.getAttribute('href');
        this.$router.push(route);
      }
    }, true);
  },
  // watch: {
  //   'publishers.publisher'(newVal) {
  //     this.$nextTick(() => {
  //       this.initializeSelect2();
  //       $('#user_name').val(this.publiserDepositeData.user_name).trigger('change');
  //     });
  //   }
  // },
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
    handleImageUpload(event) {
      this.publiserDepositeData.upload_file = event.target.files[0];
    },
    getPublishers(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
      axios
        .get(this.globalVariables.apiUrl+"admin/payments/publisher/get-data", {
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

          if ($.fn.DataTable.isDataTable("#publisher_datatables")) {
          $('#publisher_datatables').DataTable().destroy();
        }
        var formateDate = this.formatDates;
        var table = $('#publisher_datatables').DataTable({
          data: data,
          columns: [
            // { data: 'id' },
            // { data: 'id' },
            { data: 'id' },
            {
                data: "company_name",
                render: function (data, type, row) {
                  if (row.company_name != null) {
                    return row.company_name.length > 10 
                      ? '<span title="'+row.company_name+'">'+row.company_name.slice(0, 10) + '...'+'</span>'  
                      : '<span title="'+row.company_name+'">'+row.company_name+'</span>'; 
                  }
                  return '----------';
                },
              },
            { 
              data: 'fname',
              render: function (data, type, row) {
                if (row?.fname != null) {
                  return '<span title="'+row?.fname+'">'+row?.fname+'</span>';
                }
                return '----------';
              },
             },
            { 
              data: 'email',
              render: function (data, type, row) {
                if (row?.email != null) {
                  return '<span title="'+row?.email+'">'+row?.email+'</span>';
                }
                return '----------';
              },
             },
            { data: 'convart_phone' },
            { data: 'total_balance' },
            { 
              data: 'browser',
              render: function (data, type, row) {
                if (row?.browser != null) {
                  return row?.browser;
                }
                return '----------';
              },
             },
            { 
              data: 'country_code',
              render: function (data, type, row) {
                if (row?.country_code != null) {
                  return row?.country_code;
                }
                return '----------';
              },
             },
            { 
              data: 'monthly_visitors',
              render: function (data, type, row) {
                if (row?.monthly_visitors != null) {
                  return row?.monthly_visitors;
                }
                return '----------';
              },
             },
            { 
              data: 'os',
              render: function (data, type, row) {
                if (row?.os != null) {
                  return row?.os;
                }
                return '----------';
              },
             },
            { 
              data: 'telegram',
              render: function (data, type, row) {
                if (row?.telegram != null) {
                  return row?.telegram;
                }
                return '----------';
              },
             },
            { 
              data: 'facebook',
              render: function (data, type, row) {
                if (row?.facebook != null) {
                  return row?.facebook;
                }
                return '----------';
              },
             },
            { 
              data: 'skype',
              render: function (data, type, row) {
                if (row?.skype != null) {
                  return row?.skype;
                }
                return '----------';
              },
             },
            { 
              data: 'user_agent',
              render: function (data, type, row) {
                if (row?.user_agent != null) {
                  return row?.user_agent;
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
            {
                data: "created_at",
                render: function (data, type, row) {
                  return (
                    '<div class="publisher-payment-action"><button data-bs-toggle="modal" data-bs-target="#addPaymentModal" data-id=' +
                    row.id +
                    ' class="rounded-circle bg-transparent border-0 text-primary" title="Add Payment"><i class="fas fa-money-bill" data-id=' +
                    row.id +
                    "></i></button></div>"
                  );
                },
              },
              {
                data: "updated_at",
                render: function (data, type, row) {
                  return (
                    '<div class="publisher-details-action"><button data-id=' +
                    row.id +
                    ' class="rounded-circle bg-transparent border-0 text-primary" title="Payment History"><i class="fas fa-shopping-basket action-icon" data-id=' +
                    row.id +
                    "></i></button></div>"
                  );
                },
              },
          ],
          initComplete: () => { 
            $('#publisher_datatables').wrap('<div class="commonDataTablesClass"></div>');
            const table = $("#publisher_datatables").DataTable();
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
            this.addEventListenerDeposite();
            this.addEventListenerPublissher();
            this.attachEventListenersOfButton();

            this.attachEventListenersForMenu();
            this.attachEventListenersForSearch();

            this.attachEventListenersBlulkAction();
            this.attachEventListenersBlulkActionSubmit();

            const searchInput = $("#publisher_datatables_filter input");
            searchInput.val(this.searchInputValue);
            if(this.searchInputValue != ''){
                searchInput.focus();
            }

            searchInput.off().on("keyup", (e) => {
              const searchTerm = e.target.value;
              this.searchInputValue = searchTerm;
              this.getPublishers(1, perPage, searchTerm);
            });
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
              targets: 6, 
              visible: false,
            },
            {
              targets: 7, 
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
            searchPlaceholder: 'Search Publisher',
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
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                },
                {
                  extend: 'csv',
                  text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                },
                {
                  extend: 'excel',
                  text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                },
                {
                  extend: 'pdf',
                  text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                },
                {
                  extend: 'copy',
                  text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                  className: 'dropdown-item',
                  exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                }
              ]
            },
            {
              text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Add Payment</span>',
              className: 'create-new btn btn-primary me-2',
              attr: {
                id: 'create',
                'data-bs-toggle': 'modal',
                'data-bs-target': '#addPaymentModal'
              }
            },
            {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Company</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Email</a></li><li><a class="dropdown-item" href="#" data-column="4">Phone</a></li><li><a class="dropdown-item" href="#" data-column="5">Balance</a></li><li><a class="dropdown-item" href="#" data-column="6">Browser</a></li><li><a class="dropdown-item" href="#" data-column="7">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="8">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="9">OS</a></li><li><a class="dropdown-item" href="#" data-column="10">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="11">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="12">Skype</a></li><li><a class="dropdown-item" href="#" data-column="13">User Agent</a></li><li><a class="dropdown-item" href="#" data-column="14">Created At</a></li><li><a class="dropdown-item" href="#" data-column="15">Action</a></li><li><a class="dropdown-item" href="#" data-column="16">History</a></li></div></ul></div>',
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

    externalfilterreset(){
      this.checkfilter.columns = ['name'],
      this.checkfilter.showcolumn = "Name",
      this.checkfilter.role_type = 3,
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
          country_code : [],
          browser : [],
          os : [],
          created_at : [],
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
          country_code : [],
          browser : [],
          os : [],
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
          country_code : [],
          browser : [],
          os : [],
          created_at : [],
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
              this.globalVariables.apiUrl + "admin/payments/search-get-data-dal-filter",
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
    
              if ($.fn.DataTable.isDataTable("#publisher_datatables")) {
                const table = $("#publisher_datatables").DataTable();
                table.clear();
                table.rows.add(data ?? []);
                table.draw();
              } else {
                var table = $('#publisher_datatables').DataTable({
                  data: data,
                  columns: [
                    // { data: 'id' },
                    // { data: 'id' },
                    { data: 'id' },
                    {
                        data: "company_name",
                        render: function (data, type, row) {
                          if (row.company_name != null) {
                            return row.company_name.length > 10 
                              ? '<span title="'+row.company_name+'">'+row.company_name.slice(0, 10) + '...'+'</span>'  
                              : '<span title="'+row.company_name+'">'+row.company_name+'</span>'; 
                          }
                          return '----------';
                        },
                      },
                    { 
                      data: 'fname',
                      render: function (data, type, row) {
                        if (row?.fname != null) {
                          return '<span title="'+row?.fname+'">'+row?.fname+'</span>';
                        }
                        return '----------';
                      },
                    },
                    { 
                      data: 'email',
                      render: function (data, type, row) {
                        if (row?.email != null) {
                          return '<span title="'+row?.email+'">'+row?.email+'</span>';
                        }
                        return '----------';
                      },
                    },
                    { data: 'convart_phone' },
                    { data: 'total_balance' },
                    { 
                      data: 'browser',
                      render: function (data, type, row) {
                        if (row?.browser != null) {
                          return row?.browser;
                        }
                        return '----------';
                      },
                    },
                    { 
                      data: 'country_code',
                      render: function (data, type, row) {
                        if (row?.country_code != null) {
                          return row?.country_code;
                        }
                        return '----------';
                      },
                    },
                    { 
                      data: 'monthly_visitors',
                      render: function (data, type, row) {
                        if (row?.monthly_visitors != null) {
                          return row?.monthly_visitors;
                        }
                        return '----------';
                      },
                    },
                    { 
                      data: 'os',
                      render: function (data, type, row) {
                        if (row?.os != null) {
                          return row?.os;
                        }
                        return '----------';
                      },
                    },
                    { 
                      data: 'telegram',
                      render: function (data, type, row) {
                        if (row?.telegram != null) {
                          return row?.telegram;
                        }
                        return '----------';
                      },
                    },
                    { 
                      data: 'facebook',
                      render: function (data, type, row) {
                        if (row?.facebook != null) {
                          return row?.facebook;
                        }
                        return '----------';
                      },
                    },
                    { 
                      data: 'skype',
                      render: function (data, type, row) {
                        if (row?.skype != null) {
                          return row?.skype;
                        }
                        return '----------';
                      },
                    },
                    { 
                      data: 'user_agent',
                      render: function (data, type, row) {
                        if (row?.user_agent != null) {
                          return row?.user_agent;
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
                    {
                        data: "created_at",
                        render: function (data, type, row) {
                          return (
                            '<div class="publisher-payment-action"><button data-bs-toggle="modal" data-bs-target="#addPaymentModal" data-id=' +
                            row.id +
                            ' class="rounded-circle bg-transparent border-0 text-primary" title="Add Payment"><i class="fas fa-money-bill" data-id=' +
                            row.id +
                            "></i></button></div>"
                          );
                        },
                      },
                      {
                        data: "updated_at",
                        render: function (data, type, row) {
                          return (
                            '<div class="publisher-details-action"><button data-id=' +
                            row.id +
                            ' class="rounded-circle bg-transparent border-0 text-primary" title="Payment History"><i class="fas fa-shopping-basket action-icon" data-id=' +
                            row.id +
                            "></i></button></div>"
                          );
                        },
                      },
                  ],
                  initComplete: () => { 
                    $('#publisher_datatables').wrap('<div class="commonDataTablesClass"></div>');
                    const table = $("#publisher_datatables").DataTable();
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
                    this.addEventListenerDeposite();
                    this.addEventListenerPublissher();
                    this.attachEventListenersOfButton();

                    this.attachEventListenersForMenu();
                    this.attachEventListenersForSearch();

                    this.attachEventListenersBlulkAction();
                    this.attachEventListenersBlulkActionSubmit();

                    const searchInput = $("#publisher_datatables_filter input");
                    searchInput.val(this.searchInputValue);
                    if(this.searchInputValue != ''){
                        searchInput.focus();
                    }

                    searchInput.off().on("keyup", (e) => {
                      const searchTerm = e.target.value;
                      this.searchInputValue = searchTerm;
                      this.getPublishers(1, perPage, searchTerm);
                    });
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
                      targets: 6, 
                      visible: false,
                    },
                    {
                      targets: 7, 
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
                    searchPlaceholder: 'Search Publisher',
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
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                        },
                        {
                          extend: 'csv',
                          text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                        },
                        {
                          extend: 'excel',
                          text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                        },
                        {
                          extend: 'pdf',
                          text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                        },
                        {
                          extend: 'copy',
                          text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] }
                        }
                      ]
                    },
                    {
                      text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Add Payment</span>',
                      className: 'create-new btn btn-primary me-2',
                      attr: {
                        id: 'create',
                        'data-bs-toggle': 'modal',
                        'data-bs-target': '#addPaymentModal'
                      }
                    },
                    {
                          className: "btn btn-primary me-2",
                          text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Company</a></li><li><a class="dropdown-item" href="#" data-column="2">Name</a></li><li><a class="dropdown-item" href="#" data-column="3">Email</a></li><li><a class="dropdown-item" href="#" data-column="4">Phone</a></li><li><a class="dropdown-item" href="#" data-column="5">Balance</a></li><li><a class="dropdown-item" href="#" data-column="6">Browser</a></li><li><a class="dropdown-item" href="#" data-column="7">Country Code</a></li><li><a class="dropdown-item" href="#" data-column="8">Monthly Visitors</a></li><li><a class="dropdown-item" href="#" data-column="9">OS</a></li><li><a class="dropdown-item" href="#" data-column="10">Telegram</a></li><li><a class="dropdown-item" href="#" data-column="11">Facebook</a></li><li><a class="dropdown-item" href="#" data-column="12">Skype</a></li><li><a class="dropdown-item" href="#" data-column="13">User Agent</a></li><li><a class="dropdown-item" href="#" data-column="14">Created At</a></li><li><a class="dropdown-item" href="#" data-column="15">Action</a></li><li><a class="dropdown-item" href="#" data-column="16">History</a></li></div></ul></div>',
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

    attachEventListenersOfButton() {
      $("#publisher_datatables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$nextTick(() => {
            this.initializeSelect2();
          });
          this.showModal = true;
        }else if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        }  
      });
    },
    
    attachEventListenersForMenu() {
      $("#publisher_datatables_wrapper [name='publisher_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getPublishers(1,getSelectedValue);
      });
    },

    attachEventListenersForSearch() {
      $("#publisher_datatables_wrapper #publisher_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getPublishers(1,10,getSearchValue);
      });
    },

    attachEventListenersBlulkAction() {
      $('#publisher_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#publisher_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#publisher_datatables tbody .row-checkbox').each((index, checkbox) => {
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
                this.globalVariables.apiUrl + "admin/payments/commont/bulk/delete",
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
                  this.getPublishers();
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
    // Added Deposit Value 
    AddedDepositeValue(){
      this.getLoader = true;
      axios
      .post(this.globalVariables.apiUrl+"admin/payment/publisher/deposit/user-select", this.publiserDepositeData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      })
      .then((res) => {  
        if(res.data.status == 'success'){
          toastr.success(res.data.message);
          const modal = document.getElementById("addPaymentModal");
          const bootstrapModal = bootstrap.Modal.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          }
          this.$router.push('/admin-manage-publishers-pay-details/'+this.publiserDepositeData.user_name);
        }else if (res.data.status == 'error'){
          toastr.error(res.data.message);
        }else if(res.data.status == 'warning'){
          this.showModal = false;
          toastr.warning(res.data.message);
        }else{
            this.validationErrors = res.data.errors;
        }
      })
      .catch((e) => {
        return e;
      })
      .finally(() => {
        this.getLoader = false;
      });
    },

    addEventListenerDeposite() {
      $("#publisher_datatables").on("click", ".publisher-payment-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        this.publiserDepositeData.user_name = dataId;
        this.showModal = true;
        this.$nextTick(() => {
          this.initializeSelect2();
          setTimeout(() => {
            $('#user_name').val(dataId).trigger('change');
          }, 50);
        });
      });
    },

    addEventListenerPublissher() {
      $("#publisher_datatables").on("click", ".publisher-details-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        this.paymentsDtails(dataId);
      });
    },

    initializeSelect2(){
      $('#user_name').select2({
        width: '100%', 
        dropdownParent: $('#addPaymentModal')
      }).on('change', (e) => {
          this.publiserDepositeData.user_name = $(e.target).val();
      });
    },
    

    //Payment Detailse View
    paymentsDtails(id) {
      this.getLoader = true;  
      axios
        .get(this.globalVariables.apiUrl+"admin/payment/history/" + id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          if (res.data.status == "error") {
            console.log(res.data);
            toastr.error(res.data.message);
          } else {
            window.open("/admin-manage-publishers-pay-details/" + id, "_blank");
          }
        })
        .catch((e) => {
          return e;
        })
        .finally(() => {
            this.getLoader = false;  
        });
    },

    changePaymentType(type) {
      if (type === "withdraw") {
        this.depositButtonActive = false;
        this.withdrawButtonActive = true;
        this.publiserDepositeData.payment_name = "withdraw";
      } else {
        this.depositButtonActive = true;
        this.withdrawButtonActive = false;
        this.publiserDepositeData.payment_name = "deposit";
      }
    },
  },
};
</script>
<style>
#addPaymentModal .select2-container .select2-selection--single {
	height: 40px !important;
}
#addPaymentModal .select2-container--default .select2-selection--single .select2-selection__rendered {
	line-height: 39px !important;
}
#addPaymentModal .select2-container--default .select2-selection--single .select2-selection__arrow b {
	margin-top: 4px !important;
}
#publisher_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#publisher_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.country-flag {
	width: 15%;
}
</style>
<style scoped>
.modal-dialog.modal-xl {
  /* height: 150vh; */
  margin-top: 6rem;
  margin-bottom: 4rem;
  z-index: 9999;
}
.border.border-danger.text-danger.p-1.rounded {
	white-space: nowrap !important;
}
#addPaymentModal .depositactive, #addPaymentModal .withdrawactive{
	background: #685dd8;
	color: white;
}
</style>
