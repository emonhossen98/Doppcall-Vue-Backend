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
            <div class="card  mt-4">
              <div class="card-header py-3">
                    <h5 class="card-title mb-0 mt-2">Filter</h5>
                </div>
                <div class="card-header  py-2">
                    <h5 class="card-title mb-0 mt-2">
                        Lead List 
                    </h5>
                </div>
                <div class="card-body">
                    <table class="align-middle mb-0 table table-hover" id="lead_datatables">
                        <thead>
                            <tr>
                              <!-- <th></th> -->
                              <th></th>
                              <th>SL</th>
                              <th>Company Name</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Website</th>
                              <th>Country</th>
                              <th>Phone</th>
                              <th>Buy Call</th>
                              <th>Get Calls</th>
                              <th>Vertical Calls</th>
                              <th>Page URL</th>
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
                            <h5 class="mb-0">Apply Filter <template v-if="applyfillters.length > 0"><span class="badge bg-dark text-white">{{ applyfillters.length ?? 0 }}</span></template></h5>
                            <a class="clearallexternalfilter" @click="externalfilterreset()">Clear All</a>
                          </div>
                        </div>
                        <div class="row px-3" id="externalFiltersWrapper">
                          <div class="col-md-6 border-right">
                            <ul class="px-0 mt-3" id="offer-extra-filter">
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Company Name' ? 'check-active' : ''"
                                  @click="clickFilters('company_name', 'select', 'Company Name')">Company Name <i class="fa-solid fa-caret-down"></i>
                                </a>
                                <template v-if="applyfillters.includes('Company Name')">
                                  <span @click="removeSearch('Company Name','company_name','select')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'First Name' ? 'check-active' : ''"
                                  @click="clickFilters('first_name', 'search', 'First Name')">First Name 
                                </a>
                                <template v-if="applyfillters.includes('First Name')">
                                  <span @click="removeSearch('First Name','first_name','search')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Last Name' ? 'check-active' : ''"
                                  @click="clickFilters('last_name', 'search', 'Last Name')">Last Name 
                                </a>
                                <template v-if="applyfillters.includes('Last Name')">
                                  <span @click="removeSearch('Last Name','last_name','search')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Email' ? 'check-active' : ''"
                                  @click="clickFilters('email', 'select', 'Email')">Email  <i class="fa-solid fa-caret-down"></i>
                                </a>
                                <template v-if="applyfillters.includes('Email')">
                                  <span @click="removeSearch('Email','email','select')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Website' ? 'check-active' : ''"
                                  @click="clickFilters('website', 'search', 'Website')">Website 
                                </a>
                                <template v-if="applyfillters.includes('Website')">
                                  <span @click="removeSearch('Website','website','search')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Country' ? 'check-active' : ''"
                                  @click="clickFilters('country', 'select', 'Country')">Country <i class="fa-solid fa-caret-down"></i>
                                </a>
                                <template v-if="applyfillters.includes('Country')">
                                  <span @click="removeSearch('Country','country','select')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Phone' ? 'check-active' : ''"
                                  @click="clickFilters('phone', 'search', 'Phone')">Phone 
                                </a>
                                <template v-if="applyfillters.includes('Phone')">
                                  <span @click="removeSearch('Phone','phone','search')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Buy Call' ? 'check-active' : ''"
                                  @click="clickFilters('buy_call', 'search', 'Buy Call')">Buy Call 
                                </a>
                                <template v-if="applyfillters.includes('Buy Call')">
                                  <span @click="removeSearch('Buy Call','buy_call','search')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Get Calls' ? 'check-active' : ''"
                                  @click="clickFilters('get_calls', 'search', 'Get Calls')">Get Calls 
                                </a>
                                <template v-if="applyfillters.includes('Get Calls')">
                                  <span @click="removeSearch('Get Calls','get_calls','search')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Vertical Calls' ? 'check-active' : ''"
                                  @click="clickFilters('vertical_calls', 'search', 'Vertical Calls')">Vertical Calls 
                                </a>
                                <template v-if="applyfillters.includes('Vertical Calls')">
                                  <span @click="removeSearch('Vertical Calls','vertical_calls','search')" id="remove-to-search-list">x</span>
                                </template>
                              </li>
                              <li class="position-relative">
                                <a :class="checkfilter.showcolumn == 'Page URL' ? 'check-active' : ''"
                                  @click="clickFilters('page_url', 'search', 'Page URL')">Page URL 
                                </a>
                                <template v-if="applyfillters.includes('Page URL')">
                                  <span @click="removeSearch('Page URL','page_url','search')" id="remove-to-search-list">x</span>
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
                              <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('select')"> 
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
                              <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')"> 
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['first_name']"
                                    type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['first_name']" type="checkbox" value="0" id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')"> 
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['last_name']"
                                    type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['last_name']" type="checkbox" value="0" id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('select')"> 
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
                              <template v-if="checkfilter.showcolumn == 'Website' && checkfilter.types.includes('search')"> 
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['website']"
                                    type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['website']" type="checkbox" value="0" id="isnotemptyvalue">
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
                              <template v-if="checkfilter.showcolumn == 'Phone' && checkfilter.types.includes('search')"> 
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['phone']"
                                    type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['phone']" type="checkbox" value="0" id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Buy Call' && checkfilter.types.includes('search')"> 
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['buy_call']"
                                    type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['buy_call']" type="checkbox" value="0" id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Get Calls' && checkfilter.types.includes('search')"> 
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['get_calls']"
                                    type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['get_calls']" type="checkbox" value="0" id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Vertical Calls' && checkfilter.types.includes('search')"> 
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['vertical_calls']"
                                    type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['vertical_calls']" type="checkbox" value="0" id="isnotemptyvalue">
                                  <label class="form-check-label" for="isnotemptyvalue">
                                    is not Empty
                                  </label>
                                </div>
                              </template>
                              <template v-if="checkfilter.showcolumn == 'Page URL' && checkfilter.types.includes('search')"> 
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['page_url']"
                                    type="checkbox" value="1" id="isemptyvalue">
                                  <label class="form-check-label" for="isemptyvalue">
                                    is Empty
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                                    v-model="checkfilter.notemptyValues['page_url']" type="checkbox" value="0" id="isnotemptyvalue">
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
                                  <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('select')">
                                    <template v-if="IndexLeads.companyNames.length > 0">
                                      <template v-for="(company,index) in IndexLeads?.companyNames" :key="index">
                                        <div class="form-check mb-2">
                                          <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['company_name']" class="form-check-input" type="checkbox" :value="company.company_name" :id="'dynamicid'+company.company_name">
                                          <label class="form-check-label" :for="'dynamicid'+company.company_name">
                                            {{ company.company_name ?? '' }}
                                          </label>
                                        </div>
                                      </template>
                                    </template>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'First Name' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['first_name']"
                                      class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Last Name' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['last_name']"
                                      class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Email' && checkfilter.types.includes('select')">
                                    <template v-if="IndexLeads?.emails?.length > 0">
                                      <template v-for="(email,index) in IndexLeads?.emails" :key="index">
                                        <div class="form-check mb-2">
                                          <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['email']" class="form-check-input" type="checkbox" :value="email.email" :id="'dynamicid'+email?.email">
                                          <label class="form-check-label" :for="'dynamicid'+email?.email">
                                            {{ email?.email ?? '' }}
                                          </label>
                                        </div>
                                      </template>
                                    </template>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Website' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['website']"
                                      class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Country' && checkfilter.types.includes('select')">
                                    <template v-if="IndexLeads?.countries?.length > 0">
                                      <template v-for="(countrie,index) in IndexLeads?.countries" :key="index">
                                        <div class="form-check mb-2">
                                          <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['country']" class="form-check-input" type="checkbox" :value="countrie.country" :id="'dynamicid'+countrie.country">
                                          <label class="form-check-label" :for="'dynamicid'+countrie.country">
                                            {{ countrie?.country ?? '' }}
                                          </label>
                                        </div>
                                      </template>
                                    </template>
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Phone' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['phone']"
                                      class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Buy Call' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['buy_call']"
                                      class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Get Calls' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['get_calls']"
                                      class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Vertical Calls' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['vertical_calls']"
                                      class="form-control mb-2" id="filtertext" placeholder="Search here..">
                                  </template>
                                  <template v-if="checkfilter.showcolumn == 'Page URL' && checkfilter.types.includes('search')">
                                    <label for="filtertext">Contains</label>
                                    <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['page_url']"
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
                          <button class="page-link" @click="getLeadList(currentPage - 1)" :disabled="currentPage === 1" >
                            <i class="fa-solid fa-chevron-left"></i>
                          </button>
                        </li>

                        <!-- Page Numbers -->
                        <template v-for="page in paginationPages" :key="page">
                          <li class="paginate_button page-item" :class="{ active: page === currentPage }">
                            <button class="page-link" @click="getLeadList(page)">
                              {{ page }}
                            </button>
                          </li>
                        </template>

                        <!-- Next Button -->
                        <li class="paginate_button page-item next" :class="{ disabled: currentPage === lastPage }">
                          <button  class="page-link" @click="getLeadList(currentPage + 1)" :disabled="currentPage === lastPage">
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
  components: {
    Loader,
    Breadcrumb,
  },
    data() {
    return {
      IndexLeads : "",
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Lead List", url: "" },
      ], 
      getLoader: false,
      deleteLead : {
        data : "",
      },
      searchData : {
        company_name : "",
        country_name : "",
        email : "",
      },
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
        columns: ['company_name'],
        showcolumn: "Company Name",
        types : ['select'],
        emptyValues : {
          company_name : [],
          first_name : [],
          last_name : [],
          email : [],
          website : [],
          country : [],
          phone : [],
          buy_call : [],
          get_calls : [],
          vertical_calls : [],
          page_url : [],
          created_at : [],
        },
        notemptyValues : {
          company_name : [],
          first_name : [],
          last_name : [],
          email : [],
          website : [],
          country : [],
          phone : [],
          buy_call : [],
          get_calls : [],
          vertical_calls : [],
          page_url : [],
          created_at : [],
        },
        searchValues : {
          first_name : [],
          last_name : [],
          website : [],
          phone : [],
          buy_call : [],
          get_calls : [],
          vertical_calls : [],
          page_url : [],
          created_at : [],
        },
        selectedValues: {
          company_name : [],
          email : [],
          country : [],
        },
      },
      applyfillters : [],
     };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getLeadList();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#lead_datatables_wrapper .row.mx-2');
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
    getLeadList(page = 1, perPage = 10,searchValue = '') {
      this.getLoader = true;
        axios.get(this.globalVariables.apiUrl+'admin/leads', 
        { headers:{Authorization: 'Bearer ' + localStorage.getItem('token')},
        params: { page: page, perPage: perPage,search: searchValue},
      })
        .then((res) => {
            this.IndexLeads = res.data;
            const { data, current_page, last_page,recordsTotal } = res.data;
            this.currentPage = current_page;
            this.lastPage = last_page;
            this.recordsTotal = recordsTotal;

            this.startPage = (current_page - 1) * perPage + 1;
            this.endPage = Math.min(current_page * perPage, recordsTotal);
            
            if ($.fn.DataTable.isDataTable("#lead_datatables")) {
              $('#lead_datatables').DataTable().destroy();
            }
            var formateDate = this.formatDates;
            var table = $('#lead_datatables').DataTable({
              data: data,
              columns: [
                // { data: 'id' },
                { data: 'id' },
                { data: 'id' },
                { data: 'company_name',
                  render: function (data, type, row) {
                if (row?.company_name != null) {
                  return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                }
                return '----------';
              },
                 },
                { data: 'first_name',
                  render: function (data, type, row) {
                if (row?.first_name != null) {
                  return '<span title="'+row?.first_name+'">'+row?.first_name+'</span>';
                }
                return '----------';
              },
                 },
                { data: 'last_name',
                  render: function (data, type, row) {
                if (row?.last_name != null) {
                  return '<span title="'+row?.last_name+'">'+row?.last_name+'</span>';
                }
                return '----------';
              },
                 },
                { data: 'email',
                  render: function (data, type, row) {
                if (row?.email != null) {
                  return '<span title="'+row?.email+'">'+row?.email+'</span>';
                }
                return '----------';
              },
                 },
                { data: 'website',
                  render: function (data, type, row) {
                if (row?.website != null) {
                  return '<span title="'+row?.website+'">'+row?.website+'</span>';
                }
                return '----------';
              },
                 },
                  { data: 'country',
                    render: function (data, type, row) {
                  if (row?.country != null) {
                    return '<span title="'+row?.country+'">'+row?.country+'</span>';
                  }
                  return '----------';
                },
                 },
                  { data: 'phone',
                    render: function (data, type, row) {
                  if (row?.phone != null) {
                    return '<span title="'+row?.phone+'">'+row?.phone+'</span>';
                  }
                  return '----------';
                },
                 },
                  { data: 'buy_call',
                    render: function (data, type, row) {
                  if (row?.buy_call != null) {
                    return '<span title="'+row?.buy_call+'">'+row?.buy_call+'</span>';
                  }
                  return '----------';
                },
                 },
                  { data: 'get_calls',
                    render: function (data, type, row) {
                  if (row?.get_calls != null) {
                    return '<span title="'+row?.get_calls+'">'+row?.get_calls+'</span>';
                  }
                  return '----------';
                },
                 },
                  { data: 'vertical_calls',
                    render: function (data, type, row) {
                  if (row?.vertical_calls != null) {
                    return '<span title="'+row?.vertical_calls+'">'+row?.vertical_calls+'</span>';
                  }
                  return '----------';
                },
                 },
                  { data: 'page_url',
                    render: function (data, type, row) {
                  if (row?.page_url != null) {
                    return '<span title="'+row?.page_url+'">'+row?.page_url+'</span>';
                  }
                  return '----------';
                },
                 },
                  { data: 'created_at',
                    render: function (data, type, row) {
                  if (row?.created_at != null) {
                    return formateDate(row?.created_at);
                  }
                  return '----------';
                },
                 },
                {
                  data: null, 
                  title: 'Actions',
                  searchable: false,
                  orderable: false,
                  render: function (data, type, full, meta) {
                    return '<div class="lead_action d-flex align-items-center"><a href="/admin-lead-view/'+full.id+'" title="View" data-vue-route class="bg-transparent border-0 text-primary me-2" ><i class="far fa-eye fa-sm"></i></a><button type="button" title="Delete"  id="delete-btn"  data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>';
                  }
                }
              ],
              initComplete: () => { 
                $('#lead_datatables').wrap('<div class="commonDataTablesClass"></div>');
                const table = $("#lead_datatables").DataTable();
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
                this.attachEventListenersOfButton();
                this.attachEventListenersForSearch();
                this.attachEventListenersBlulkAction();
                this.attachEventListenersBlulkActionSubmit();

                const searchInput = $("#lead_datatables_filter input");
                searchInput.val(this.searchInputValue);
                if(this.searchInputValue != ''){
                    searchInput.focus();
                }

                searchInput.off().on("keyup", (e) => {
                  const searchTerm = e.target.value;
                  this.searchInputValue = searchTerm;
                  this.getLeadList(1, perPage, searchTerm);
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
                    selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                  },
                  render: function (data, type, row) {
                    return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                  },
                  searchable: false
                },
            {
              targets: 10, 
              visible: false,
            },
            {
              targets: 11, 
              visible: false,
            },
              ],
              order: [[1, 'asc']],
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
                searchPlaceholder: 'Search Lead Method',
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
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                    },
                    {
                      extend: 'csv',
                      text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                    },
                    {
                      extend: 'excel',
                      text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                    },
                    {
                      extend: 'pdf',
                      text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                    },
                    {
                      extend: 'copy',
                      text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                      className: 'dropdown-item',
                      exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                    }
                  ]
                },
                {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="3">First Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="5">Email</a></li><li><a class="dropdown-item" href="#" data-column="6">Website</a></li><li><a class="dropdown-item" href="#" data-column="7">Country</a></li><li><a class="dropdown-item" href="#" data-column="8">Phone</a></li><li><a class="dropdown-item" href="#" data-column="9">Buy Call</a></li><li><a class="dropdown-item" href="#" data-column="10">Get Calls</a></li><li><a class="dropdown-item" href="#" data-column="11">Vertical Calls</a></li><li><a class="dropdown-item" href="#" data-column="12">Page URL</a></li><li><a class="dropdown-item" href="#" data-column="13">Created At</a></li><li><a class="dropdown-item" href="#" data-column="14">Action</a></li></div></ul></div>',
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
          console.log(error);
        })
        .finally(() => {
          this.getLoader = false;
        });
    },

     externalfilterreset(){
      this.checkfilter.columns = ['company_name'],
      this.checkfilter.showcolumn = "Company Name",
      this.checkfilter.types = ['select'],
      this.checkfilter.emptyValues = {
          company_name : [],
          first_name : [],
          last_name : [],
          email : [],
          website : [],
          country : [],
          phone : [],
          buy_call : [],
          get_calls : [],
          vertical_calls : [],
          page_url : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          company_name : [],
          first_name : [],
          last_name : [],
          email : [],
          website : [],
          country : [],
          phone : [],
          buy_call : [],
          get_calls : [],
          vertical_calls : [],
          page_url : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          first_name : [],
          last_name : [],
          website : [],
          phone : [],
          buy_call : [],
          get_calls : [],
          vertical_calls : [],
          page_url : [],
          created_at : [],
      },
      this.checkfilter.selectedValues = {
          company_name : [],
          email : [],
          country : [],
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
              this.globalVariables.apiUrl + "admin/leads/search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#lead_datatables")) {
                const table = $("#lead_datatables").DataTable();
                table.clear();
                table.rows.add(data ?? []);
                table.draw();
              } else {
                var formateDate = this.formatDates;
                var table = $('#lead_datatables').DataTable({
                  data: data,
                  columns: [
                    // { data: 'id' },
                    { data: 'id' },
                    { data: 'id' },
                    { data: 'company_name',
                      render: function (data, type, row) {
                    if (row?.company_name != null) {
                      return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                    }
                    return '----------';
                  },
                    },
                    { data: 'first_name',
                      render: function (data, type, row) {
                    if (row?.first_name != null) {
                      return '<span title="'+row?.first_name+'">'+row?.first_name+'</span>';
                    }
                    return '----------';
                  },
                    },
                    { data: 'last_name',
                      render: function (data, type, row) {
                    if (row?.last_name != null) {
                      return '<span title="'+row?.last_name+'">'+row?.last_name+'</span>';
                    }
                    return '----------';
                  },
                    },
                    { data: 'email',
                      render: function (data, type, row) {
                    if (row?.email != null) {
                      return '<span title="'+row?.email+'">'+row?.email+'</span>';
                    }
                    return '----------';
                  },
                    },
                    { data: 'website',
                      render: function (data, type, row) {
                    if (row?.website != null) {
                      return '<span title="'+row?.website+'">'+row?.website+'</span>';
                    }
                    return '----------';
                  },
                    },
                      { data: 'country',
                        render: function (data, type, row) {
                      if (row?.country != null) {
                        return '<span title="'+row?.country+'">'+row?.country+'</span>';
                      }
                      return '----------';
                    },
                    },
                      { data: 'phone',
                        render: function (data, type, row) {
                      if (row?.phone != null) {
                        return '<span title="'+row?.phone+'">'+row?.phone+'</span>';
                      }
                      return '----------';
                    },
                    },
                      { data: 'buy_call',
                        render: function (data, type, row) {
                      if (row?.buy_call != null) {
                        return '<span title="'+row?.buy_call+'">'+row?.buy_call+'</span>';
                      }
                      return '----------';
                    },
                    },
                      { data: 'get_calls',
                        render: function (data, type, row) {
                      if (row?.get_calls != null) {
                        return '<span title="'+row?.get_calls+'">'+row?.get_calls+'</span>';
                      }
                      return '----------';
                    },
                    },
                      { data: 'vertical_calls',
                        render: function (data, type, row) {
                      if (row?.vertical_calls != null) {
                        return '<span title="'+row?.vertical_calls+'">'+row?.vertical_calls+'</span>';
                      }
                      return '----------';
                    },
                    },
                      { data: 'page_url',
                        render: function (data, type, row) {
                      if (row?.page_url != null) {
                        return '<span title="'+row?.page_url+'">'+row?.page_url+'</span>';
                      }
                      return '----------';
                    },
                    },
                      { data: 'created_at',
                        render: function (data, type, row) {
                      if (row?.created_at != null) {
                        return formateDate(row?.created_at);
                      }
                      return '----------';
                    },
                    },
                    {
                      data: null, 
                      title: 'Actions',
                      searchable: false,
                      orderable: false,
                      render: function (data, type, full, meta) {
                        return '<div class="lead_action d-flex align-items-center"><a href="/admin-lead-view/'+full.id+'" title="View" data-vue-route class="bg-transparent border-0 text-primary me-2" ><i class="far fa-eye fa-sm"></i></a><button type="button" title="Delete"  id="delete-btn"  data-id='+full.id +' class="bg-transparent border-0 text-danger"><i class="far fa-trash-alt fa-sm" id="delete-btn" data-id='+full.id +'></i></button></div>';
                      }
                    }
                  ],
                  initComplete: () => { 
                    $('#lead_datatables').wrap('<div class="commonDataTablesClass"></div>');
                    const table = $("#lead_datatables").DataTable();
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
                    this.attachEventListenersOfButton();
                    this.attachEventListenersForSearch();
                    this.attachEventListenersBlulkAction();
                    this.attachEventListenersBlulkActionSubmit();

                    const searchInput = $("#lead_datatables_filter input");
                    searchInput.val(this.searchInputValue);
                    if(this.searchInputValue != ''){
                        searchInput.focus();
                    }

                    searchInput.off().on("keyup", (e) => {
                      const searchTerm = e.target.value;
                      this.searchInputValue = searchTerm;
                      this.getLeadList(1, perPage, searchTerm);
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
                        selectAllRender: '<input type="checkbox" class="form-check-input ms-1">',
                      },
                      render: function (data, type, row) {
                        return `<input type="checkbox" class="dt-checkboxes form-check-input ms-1 row-checkbox" data-id="${row.id}">`;
                      },
                      searchable: false
                    },
                {
                  targets: 10, 
                  visible: false,
                },
                {
                  targets: 11, 
                  visible: false,
                },
                  ],
                  order: [[1, 'asc']],
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
                    searchPlaceholder: 'Search Lead Method',
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
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        },
                        {
                          extend: 'csv',
                          text: '<i class="ti ti-file me-1 ti-xs text-danger"></i>Csv',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        },
                        {
                          extend: 'excel',
                          text: '<i class="ti ti-file-spreadsheet me-1 ti-xs text-success"></i>Excel',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        },
                        {
                          extend: 'pdf',
                          text: '<i class="ti ti-file-description me-1 ti-xs text-info"></i>Pdf',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        },
                        {
                          extend: 'copy',
                          text: '<i class="ti ti-copy me-1 ti-xs text-warning"></i>Copy',
                          className: 'dropdown-item',
                          exportOptions: { columns: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }
                        }
                      ]
                    },
                    {
                      className: "btn btn-primary me-2",
                      text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Sl</a></li><li><a class="dropdown-item" href="#" data-column="2">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="3">First Name</a></li><li><a class="dropdown-item" href="#" data-column="4">Last Name</a></li><li><a class="dropdown-item" href="#" data-column="5">Email</a></li><li><a class="dropdown-item" href="#" data-column="6">Website</a></li><li><a class="dropdown-item" href="#" data-column="7">Country</a></li><li><a class="dropdown-item" href="#" data-column="8">Phone</a></li><li><a class="dropdown-item" href="#" data-column="9">Buy Call</a></li><li><a class="dropdown-item" href="#" data-column="10">Get Calls</a></li><li><a class="dropdown-item" href="#" data-column="11">Vertical Calls</a></li><li><a class="dropdown-item" href="#" data-column="12">Page URL</a></li><li><a class="dropdown-item" href="#" data-column="13">Created At</a></li><li><a class="dropdown-item" href="#" data-column="14">Action</a></li></div></ul></div>',
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

    attachEventListenersOfButton() {
      $("#lead_datatables_wrapper").on("click", "button", (event) => {
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

    attachEventListenersBlulkAction() {
      $('#lead_datatables').on('change', '.row-checkbox', (event) => {
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
      $('#lead_datatables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#lead_datatables tbody .row-checkbox').each((index, checkbox) => {
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
      const bulkActionWrapperSecond = $('#bulk-action-container-second');
      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapper?.removeClass('d-none');
      } else {
        bulkActionWrapper?.addClass('d-none');
      }

      if (this.bulkactionids.selectedIds.length > 0) {
        bulkActionWrapperSecond?.removeClass('d-none');
      } else {
        bulkActionWrapperSecond?.addClass('d-none');
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
                this.globalVariables.apiUrl + "admin/leads/bulk/delete",
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
                  this.getLeadList();
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

    attachEventListeners() {
      $("#lead_datatables").on("click", ".lead_action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("id");
       if(dataClass === 'delete-btn'){
            this.deleteLead.data = dataId;
            this.delteLead();
        }
      });
    },

    attachEventListenersForMenu() {
      $("#lead_datatables_wrapper [name='lead_datatables_length']").on("change", (event) => {
        this.getLoader = true;
        const target = $(event.target);
        const getSelectedValue = target.val();
        this.getLeadList(1,getSelectedValue);
      });
    },
    attachEventListenersForSearch() {
      $("#lead_datatables_wrapper #lead_datatables_filter input").on("keyup", (event) => {
        const target = $(event.target);
        const getSearchValue = target.val();
        this.getLeadList(1,10,getSearchValue);
      });
    },

     // Lead  Delete
     delteLead() {
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
            .post(this.globalVariables.apiUrl+`admin/leads/delete`, this.deleteLead, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
                toastr.success(res.data.message);
                this.getLeadList();
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

    expotAllLeadList(){
      var url = this.globalVariables.appUrl+"admin/leads/exports";
      window.open(url,'_blank')
    },
  },
}
</script>
<style>
#lead_datatables td {
  white-space: nowrap; /* Prevents wrapping */
  overflow: hidden; /* Hides overflow */
  text-overflow: ellipsis; /* Adds "..." for overflow */
  max-width: 100px; /* Set max width for cell */
}
#lead_datatables colgroup:nth-of-type(2) {
	display: none !important;
}
#lead_datatables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
#lead_datatables  .form-check {
	text-overflow: ellipsis;
	overflow: hidden;
}
.lead_action button {
	height: 32px;
	width: 31px;
	text-align: center;
}
</style>