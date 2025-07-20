<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <!-- Content wrapper -->
  <div class="content-wrapper">
    <!-- {{ jobcareers }} -->
    <!-- Content -->
    <div class="container-fluid flex-grow-1 container-p-y">
      <Breadcrumb :breadcrumbs="breadcrumbs"></Breadcrumb>
      <div class="row mt-4">
        <div class="col-md-12 mb-sm-0 mb-3">
          <div class="card">
            <div class="custom-card-header pb-0">
              <h5 class="card-title d-flex justify-content-between align-items-center mb-0 px-3 pt-3 ms-2">
                Job Career
              </h5>
            </div>
            <div class="card-body">
              <table class="align-middle mb-0 table table-hover" id="job_careers_tables">
                <thead>
                  <!-- <th></th> -->
                  <th></th>
                  <!-- <th>Sl</th> -->
                  <th>Job Title</th>
                  <th>Job Type</th>
                  <th>Job Location</th>
                  <th>Salary</th>
                  <th>Job Start Date</th>
                  <th>Job Deadline</th>
                  <th>Experience</th>
                  <th>Category</th>
                  <th>Company Name</th>
                  <th>Company Address</th>
                  <th>Company Location</th>
                  <th>Company Phone</th>
                  <th>Company Email</th>
                  <th>Status</th>
                  <th>Company Logo</th>
                  <th>Created At</th>
                  <th>Action</th>
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
                          <a :class="checkfilter.showcolumn == 'Job Title' ? 'check-active' : ''"
                            @click="clickFilters('job_title', 'search', 'Job Title')">Job Title 
                          </a>
                          <template v-if="applyfillters.includes('Job Title')">
                            <span @click="removeSearch('Job Title','job_title','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Job Type' ? 'check-active' : ''"
                            @click="clickFilters('job_type', 'search', 'Job Type')">Job Type 
                          </a>
                          <template v-if="applyfillters.includes('Job Type')">
                            <span @click="removeSearch('Job Type','job_type','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Location' ? 'check-active' : ''"
                            @click="clickFilters('location', 'search', 'Location')">Location 
                          </a>
                          <template v-if="applyfillters.includes('Location')">
                            <span @click="removeSearch('Location','location','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Company Name' ? 'check-active' : ''"
                            @click="clickFilters('company_name', 'search', 'Company Name')">Company Name 
                          </a>
                          <template v-if="applyfillters.includes('Company Name')">
                            <span @click="removeSearch('Company Name','company_name','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Company Location' ? 'check-active' : ''"
                            @click="clickFilters('company_location', 'search', 'Company Location')">Company Location 
                          </a>
                          <template v-if="applyfillters.includes('Company Location')">
                            <span @click="removeSearch('Company Location','company_location','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Company Address' ? 'check-active' : ''"
                            @click="clickFilters('company_address', 'search', 'Company Address')">Company Address 
                          </a>
                          <template v-if="applyfillters.includes('Company Address')">
                            <span @click="removeSearch('Company Address','company_address','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Company Phone' ? 'check-active' : ''"
                            @click="clickFilters('company_phone', 'search', 'Company Phone')">Company Phone 
                          </a>
                          <template v-if="applyfillters.includes('Company Phone')">
                            <span @click="removeSearch('Company Phone','company_phone','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Company Email' ? 'check-active' : ''"
                            @click="clickFilters('company_email', 'search', 'Company Email')">Company Email 
                          </a>
                          <template v-if="applyfillters.includes('Company Email')">
                            <span @click="removeSearch('Company Email','company_email','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Salary Range' ? 'check-active' : ''"
                            @click="clickFilters('salary_range', 'search', 'Salary Range')">Salary Range 
                          </a>
                          <template v-if="applyfillters.includes('Salary Range')">
                            <span @click="removeSearch('Salary Range','salary_range','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Experience' ? 'check-active' : ''"
                            @click="clickFilters('experience', 'search', 'Experience')">Experience 
                          </a>
                          <template v-if="applyfillters.includes('Experience')">
                            <span @click="removeSearch('Experience','experience','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Job Start Date' ? 'check-active' : ''"
                            @click="clickFilters('job_startdate', 'search', 'Job Start Date')">Job Start Date 
                          </a>
                          <template v-if="applyfillters.includes('Job Start Date')">
                            <span @click="removeSearch('Job Start Date','job_startdate','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Job Dead Line' ? 'check-active' : ''"
                            @click="clickFilters('job_deadline', 'search', 'Job Dead Line')">Job Dead Line 
                          </a>
                          <template v-if="applyfillters.includes('Job Dead Line')">
                            <span @click="removeSearch('Job Dead Line','job_deadline','search')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Catagory' ? 'check-active' : ''"
                            @click="clickFilters('catagory_id', 'select', 'Catagory')">Catagory <i class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Catagory')">
                            <span  @click="removeSearch('Catagory','catagory_id','select')" id="remove-to-search-list">x</span>
                          </template>
                        </li>
                        <li class="position-relative">
                          <a :class="checkfilter.showcolumn == 'Status' ? 'check-active' : ''"
                            @click="clickFilters('status', 'select', 'Status')">Status <i class="fa-solid fa-caret-down"></i>
                          </a>
                          <template v-if="applyfillters.includes('Status')">
                            <span  @click="removeSearch('Status','status','select')" id="remove-to-search-list">x</span>
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
                        <template v-if="checkfilter.showcolumn == 'Job Title' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['job_title']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['job_title']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Job Type' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['job_type']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['job_type']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Location' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['location']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['location']" type="checkbox" value="0" id="isnotemptyvalue">
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
                        <template v-if="checkfilter.showcolumn == 'Company Location' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_location']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['company_location']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Company Address' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_address']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['company_address']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Company Phone' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_phone']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['company_phone']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Company Email' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['company_email']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['company_email']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Salary Range' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['salary_range']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['salary_range']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Experience' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['experience']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['experience']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Job Start Date' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['job_startdate']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['job_startdate']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Job Dead Line' && checkfilter.types.includes('search')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['job_deadline']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['job_deadline']" type="checkbox" value="0" id="isnotemptyvalue">
                            <label class="form-check-label" for="isnotemptyvalue">
                              is not Empty
                            </label>
                          </div>
                        </template>
                        <template v-if="checkfilter.showcolumn == 'Catagory' && checkfilter.types.includes('select')"> 
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.emptyValues['catagory_id']"
                              type="checkbox" value="1" id="isemptyvalue">
                            <label class="form-check-label" for="isemptyvalue">
                              is Empty
                            </label>
                          </div>
                          <div class="form-check mb-2">
                            <input class="form-check-input" @change="clickCheckboxFilters(checkfilter.showcolumn)"
                              v-model="checkfilter.notemptyValues['catagory_id']" type="checkbox" value="0" id="isnotemptyvalue">
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
                            <template v-if="checkfilter.showcolumn == 'Job Title' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['job_title']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Job Type' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['job_type']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Location' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['location']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Company Name' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_name']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Company Location' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_location']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Company Address' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_address']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Company Phone' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_phone']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Company Email' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['company_email']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Salary Range' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['salary_range']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Experience' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['experience']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Job Start Date' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['job_startdate']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Job Dead Line' && checkfilter.types.includes('search')">
                              <label for="filtertext">Contains</label>
                              <input type="text" @keyup="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.searchValues['job_deadline']"
                                class="form-control mb-2" id="filtertext" placeholder="Search here..">
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Catagory' && checkfilter.types.includes('select')">
                              <template v-if="careerCategory.length > 0">
                                <template v-for="(category,index) in careerCategory" :key="index">
                                  <div class="form-check mb-2">
                                    <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['catagory_id']" class="form-check-input" type="checkbox" :value="category.id" :id="'dynamicid'+category.id">
                                    <label class="form-check-label" :for="'dynamicid'+category.id">
                                      {{ category.name ?? '' }}
                                    </label>
                                  </div>
                                </template>
                              </template>
                            </template>
                            <template v-if="checkfilter.showcolumn == 'Status' && checkfilter.types.includes('select')">
                              <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="1" id="1">
                                  <label class="form-check-label" for="1">
                                    Active
                                  </label>
                                </div>
                                <div class="form-check mb-2">
                                  <input @change="clickCheckboxFilters(checkfilter.showcolumn)" v-model="checkfilter.selectedValues['status']" class="form-check-input" type="checkbox" value="2" id="2">
                                  <label class="form-check-label" for="2">
                                    Pending
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
  components: {
    Loader,
    Breadcrumb,
  },
  data() {
    return {
      getLoader: false,
      breadcrumbs: [
        { label: "Dashboard", url: "/dashboard" },
        { label: "Job Career", url: "" },
      ],
      statusData: {
        id: "",
        status: "",
      },
      bulkactionids : {
        selectedIds: [],
        status: "",
      },
      showHiddenExternalFilter: false,
      checkfilter: {
        columns: ['job_title'],
        showcolumn: "Job Title",
        types : ['search'],
        emptyValues : {
          job_title : [],
          job_type : [],
          location : [],
          company_name : [],
          company_location : [],
          company_address : [],
          company_phone : [],
          company_email : [],
          salary_range : [],
          experience : [],
          job_startdate : [],
          job_deadline : [],
          catagory_id : [],
          status : [],
          created_at : [],
        },
        notemptyValues : {
          job_title : [],
          job_type : [],
          location : [],
          company_name : [],
          company_location : [],
          company_address : [],
          company_phone : [],
          company_email : [],
          salary_range : [],
          experience : [],
          job_startdate : [],
          job_deadline : [],
          catagory_id : [],
          status : [],
          created_at : [],
        },
        searchValues : {
          job_title : [],
          job_type : [],
          location : [],
          company_name : [],
          company_location : [],
          company_address : [],
          company_phone : [],
          company_email : [],
          salary_range : [],
          experience : [],
          job_startdate : [],
          job_deadline : [],
          created_at : [],
        },
        selectedValues: {
          catagory_id : [],
          status : [],
        },
      },
      applyfillters : [],
      careerCategory : [],
    };
  },
  async mounted() { 
      try {
        const { role, isAuthorized } = await fetchUserRole();
        if (role == 'Super' || role == 'Admin') {
          this.getLoader = true;
          this.getJobCareers();
          this.$nextTick(() => {
            const dataTableWrapper = document.querySelectorAll('#job_careers_tables_wrapper .row.mx-2');
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
  methods: {
    getJobCareers() {
      axios
        .get(this.globalVariables.apiUrl+"admin/career/jobcareer", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          var doaminName = this.globalVariables.appUrl;
          this.careerCategory = res.data.careerCategory;
          if ($.fn.DataTable.isDataTable("#job_careers_tables")) {
            $('#job_careers_tables').DataTable().destroy();
          }
          var formateDate = this.formatDates;
          var table = $('#job_careers_tables').DataTable({
            data: res.data.jobcareers,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              {
                data: 'job_title',
                render: function (data, type, row) {
                  if (row?.job_title != null) {
                    return '<span title="'+row?.job_title+'">'+row?.job_title+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'job_type',
                render: function (data, type, row) {
                  if (row?.job_type != null) {
                    return '<span title="'+row?.job_type+'">'+row?.job_type+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'location',
                render: function (data, type, row) {
                  if (row?.location != null) {
                    return '<span title="'+row?.location+'">'+row?.location+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'salary_range',
                render: function (data, type, row) {
                  if (row?.salary_range != null) {
                    return '<span title="'+row?.salary_range+'">'+row?.salary_range+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'job_startdate',
                render: function (data, type, row) {
                  if (row?.job_startdate != null) {
                    return '<span title="'+row?.job_startdate+'">'+row?.job_startdate+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'job_deadline',
                render: function (data, type, row) {
                  if (row?.job_deadline != null) {
                    return '<span title="'+row?.job_deadline+'">'+row?.job_deadline+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'experience',
                render: function (data, type, row) {
                  if (row?.experience != null) {
                    return '<span title="'+row?.experience+'">'+row?.experience+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'category',
                render: function (data, type, row) {
                  if (row?.category?.name != null) {
                    return '<span title="'+row?.category?.name+'">'+row?.category?.name+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'company_name',
                render: function (data, type, row) {
                  if (row?.company_name != null) {
                    return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'company_address',
                render: function (data, type, row) {
                  if (row?.company_address != null) {
                    return '<span title="'+row?.company_address+'">'+row?.company_address+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'company_location',
                render: function (data, type, row) {
                  if (row?.company_location != null) {
                    return '<span title="'+row?.company_location+'">'+row?.company_location+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'company_phone',
                render: function (data, type, row) {
                  if (row?.company_phone != null) {
                    return '<span title="'+row?.company_phone+'">'+row?.company_phone+'</span>';
                  }
                  return '----------';
                },
              },
              {
                data: 'company_email',
                render: function (data, type, row) {
                  if (row?.company_email != null) {
                    return '<span title="'+row?.company_email+'">'+row?.company_email+'</span>';
                  }
                  return '----------';
                },
               },
              { data: 'convart_status' },
              {
                data: 'company_logo',
                render: function (data, type, row) {
                  return (
                    '<img class="company_image" src="' +doaminName+
                    data +
                    '">'
                  );
                }
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
              $('#job_careers_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#job_careers_tables").DataTable();
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
              this.attachEventListenersOfButton();
              this.attachEventListeners();
              this.ListenersOfCheckbox();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
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
                targets: 5, 
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
                targets: 15, 
                visible: false,
              },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return '<div class="text-start type-datatables-action"><a title="Edit"  data-vue-route href="/admin-career-jobcareer-edit/'+full.id+'" class="rounded-circle bg-transparent border-0 text-primary"><i class="far fa-edit fa-sm me-2"></i></a><button type="button" title="Delete"  data-id=' +
                    full.id +
                    ' class="type-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                    full.id +
                    ' " class="far fa-trash-alt fa-sm"></i></button></div>'; 
                }
              }
            ],
            order: [[2, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4"f>' + 
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
              searchPlaceholder: 'Search Career',
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
                      <option value="0">Bulk Pending</option>
                      <option value="1">Bulk Active</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
                text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: 'create-new btn btn-primary me-2',
                attr: { id: 'create' },
              },
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Job Title</a></li><li><a class="dropdown-item" href="#" data-column="2">Job Type</a></li><li><a class="dropdown-item" href="#" data-column="3">Job Location</a></li><li><a class="dropdown-item" href="#" data-column="4">Salary</a></li><li><a class="dropdown-item" href="#" data-column="5">Job Start Date</a></li><li><a class="dropdown-item" href="#" data-column="6">Job Deadline</a></li><li><a class="dropdown-item" href="#" data-column="7">Experience</a></li><li><a class="dropdown-item" href="#" data-column="8">Category</a></li><li><a class="dropdown-item" href="#" data-column="9">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="10">Company Address</a></li><li><a class="dropdown-item" href="#" data-column="11">Company Location</a></li><li><a class="dropdown-item" href="#" data-column="12">Company Phone</a></li><li><a class="dropdown-item" href="#" data-column="13">Company Email</a></li><li><a class="dropdown-item" href="#" data-column="14">Status</a></li><li><a class="dropdown-item" href="#" data-column="15">Company Logo</a></li><li><a class="dropdown-item" href="#" data-column="16">Created At</a></li><li><a class="dropdown-item" href="#" data-column="16">Action</a></li></div></ul></div>',
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
      this.checkfilter.columns = ['job_title'],
      this.checkfilter.showcolumn = "Job Title",
      this.checkfilter.types = ['search'],
      this.checkfilter.emptyValues = {
          job_title : [],
          job_type : [],
          location : [],
          company_name : [],
          company_location : [],
          company_address : [],
          company_phone : [],
          company_email : [],
          salary_range : [],
          experience : [],
          job_startdate : [],
          job_deadline : [],
          catagory_id : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.notemptyValues = {
          job_title : [],
          job_type : [],
          location : [],
          company_name : [],
          company_location : [],
          company_address : [],
          company_phone : [],
          company_email : [],
          salary_range : [],
          experience : [],
          job_startdate : [],
          job_deadline : [],
          catagory_id : [],
          status : [],
          created_at : [],
      },
      this.checkfilter.searchValues = {
          job_title : [],
          job_type : [],
          location : [],
          company_name : [],
          company_location : [],
          company_address : [],
          company_phone : [],
          company_email : [],
          salary_range : [],
          experience : [],
          job_startdate : [],
          job_deadline : [],
          created_at : [],
      },
      this.checkfilter.selectedValues = {
          catagory_id : [],
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
              this.globalVariables.apiUrl + "admin/jobcareer-search-get-data-all-filter",
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
    
              if ($.fn.DataTable.isDataTable("#job_careers_tables")) {
                const table = $("#job_careers_tables").DataTable();
                table.clear();
                table.rows.add(res.data.jobcareers ?? []);
                table.draw();
              } else {
                var table = $('#job_careers_tables').DataTable({
            data: res.data.jobcareers,
            columns: [
              // { data: 'id' },
              { data: 'id' },
              {
                data: 'job_title',
                render: function (data, type, row) {
                  if (row?.job_title != null) {
                    return '<span title="'+row?.job_title+'">'+row?.job_title+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'job_type',
                render: function (data, type, row) {
                  if (row?.job_type != null) {
                    return '<span title="'+row?.job_type+'">'+row?.job_type+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'location',
                render: function (data, type, row) {
                  if (row?.location != null) {
                    return '<span title="'+row?.location+'">'+row?.location+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'salary_range',
                render: function (data, type, row) {
                  if (row?.salary_range != null) {
                    return '<span title="'+row?.salary_range+'">'+row?.salary_range+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'job_startdate',
                render: function (data, type, row) {
                  if (row?.job_startdate != null) {
                    return '<span title="'+row?.job_startdate+'">'+row?.job_startdate+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'job_deadline',
                render: function (data, type, row) {
                  if (row?.job_deadline != null) {
                    return '<span title="'+row?.job_deadline+'">'+row?.job_deadline+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'experience',
                render: function (data, type, row) {
                  if (row?.experience != null) {
                    return '<span title="'+row?.experience+'">'+row?.experience+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'category',
                render: function (data, type, row) {
                  if (row?.category?.name != null) {
                    return '<span title="'+row?.category?.name+'">'+row?.category?.name+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'company_name',
                render: function (data, type, row) {
                  if (row?.company_name != null) {
                    return '<span title="'+row?.company_name+'">'+row?.company_name+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'company_address',
                render: function (data, type, row) {
                  if (row?.company_address != null) {
                    return '<span title="'+row?.company_address+'">'+row?.company_address+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'company_location',
                render: function (data, type, row) {
                  if (row?.company_location != null) {
                    return '<span title="'+row?.company_location+'">'+row?.company_location+'</span>';
                  }
                  return '----------';
                },
                },
              {
                data: 'company_phone',
                render: function (data, type, row) {
                  if (row?.company_phone != null) {
                    return '<span title="'+row?.company_phone+'">'+row?.company_phone+'</span>';
                  }
                  return '----------';
                },
              },
              {
                data: 'company_email',
                render: function (data, type, row) {
                  if (row?.company_email != null) {
                    return '<span title="'+row?.company_email+'">'+row?.company_email+'</span>';
                  }
                  return '----------';
                },
               },
              { data: 'convart_status' },
              {
                data: 'company_logo',
                render: function (data, type, row) {
                  return (
                    '<img class="company_image" src="' +doaminName+
                    data +
                    '">'
                  );
                }
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
              $('#job_careers_tables').wrap('<div class="commonDataTablesClass"></div>');
              const table = $("#job_careers_tables").DataTable();
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
              this.attachEventListenersOfButton();
              this.attachEventListeners();
              this.ListenersOfCheckbox();
              this.attachEventListenersBlulkAction();
              this.attachEventListenersBlulkActionSubmit();
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
                targets: 5, 
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
                targets: 15, 
                visible: false,
              },
              {
                targets: -1,
                title: 'Actions',
                searchable: false,
                orderable: false,
                render: function (data, type, full, meta) {
                  return '<div class="text-start type-datatables-action"><a title="Edit"  data-vue-route href="/admin-career-jobcareer-edit/'+full.id+'" class="rounded-circle bg-transparent border-0 text-primary"><i class="far fa-edit fa-sm me-2"></i></a><button type="button" title="Delete"  data-id=' +
                    full.id +
                    ' class="type-delete-btn border-0 rounded-circle bg-transparent border-0 text-danger"><i  data-id="' +
                    full.id +
                    ' " class="far fa-trash-alt fa-sm"></i></button></div>'; 
                }
              }
            ],
            order: [[2, 'desc']],
            dom: '<"row mx-2"' +
              '<"col-md-4"f>' + 
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
              searchPlaceholder: 'Search Career',
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
                      <option value="0">Bulk Pending</option>
                      <option value="1">Bulk Active</option>
                    </select>
                  </div>
                `,
                className: "me-2 p-0 btn-primary d-none",
                attr: { id: "bulk-action-container" },
              },
              {
                text: '<span id="create"><i class="ti ti-plus me-1 ti-xs"></i>Create</span>',
                className: 'create-new btn btn-primary me-2',
                attr: { id: 'create' },
              },
              {
                  className: "btn btn-primary me-2",
                  text: '<div class="dropdown me-3"><span class="dropdown-toggle" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-columns me-1"></i> Select Column</span><ul class="dropdown-menu select-colunm-position" aria-labelledby="dropdownMenuButton2"><div class="display-prefarnce-class">Display Preferences</div><div class="commonDataTablesClassScrollbar"><li><a class="dropdown-item" href="#" data-column="0">Bulk Action</a></li><li><a class="dropdown-item" href="#" data-column="1">Job Title</a></li><li><a class="dropdown-item" href="#" data-column="2">Job Type</a></li><li><a class="dropdown-item" href="#" data-column="3">Job Location</a></li><li><a class="dropdown-item" href="#" data-column="4">Salary</a></li><li><a class="dropdown-item" href="#" data-column="5">Job Start Date</a></li><li><a class="dropdown-item" href="#" data-column="6">Job Deadline</a></li><li><a class="dropdown-item" href="#" data-column="7">Experience</a></li><li><a class="dropdown-item" href="#" data-column="8">Category</a></li><li><a class="dropdown-item" href="#" data-column="9">Company Name</a></li><li><a class="dropdown-item" href="#" data-column="10">Company Address</a></li><li><a class="dropdown-item" href="#" data-column="11">Company Location</a></li><li><a class="dropdown-item" href="#" data-column="12">Company Phone</a></li><li><a class="dropdown-item" href="#" data-column="13">Company Email</a></li><li><a class="dropdown-item" href="#" data-column="14">Status</a></li><li><a class="dropdown-item" href="#" data-column="15">Company Logo</a></li><li><a class="dropdown-item" href="#" data-column="16">Created At</a></li><li><a class="dropdown-item" href="#" data-column="16">Action</a></li></div></ul></div>',
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

    attachEventListenersBlulkAction() {
      $('#job_careers_tables').on('change', '.row-checkbox', (event) => {
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
      $('#job_careers_tables thead').on('change', 'input[type="checkbox"]', (event) => {
        const isChecked = event.target.checked;
        $('#job_careers_tables tbody .row-checkbox').each((index, checkbox) => {
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
        } else {
          if (action === "1") {
            this.bulkactionids.status = '1';
            const alertTitle = "Job Career Want to Approved";
            this.bulkStatusChange(alertTitle);
          } else{
            this.bulkactionids.status = '0';
            const alertTitle = "Job Career Want to Pending";
            this.bulkStatusChange(alertTitle);
          }
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
                this.globalVariables.apiUrl + "admin/jobcareer/bulk/delete",
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
                  this.getJobCareers();
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

    bulkStatusChange(alertTitle) {
      Swal.fire({
        text: alertTitle,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.value) {
          (this.getLoader = true),
            axios
              .post(
                this.globalVariables.apiUrl + "admin/jobcareer/bulk/status",
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
                  this.getJobCareers();
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
      $("#job_careers_tables").on("click", ".type-datatables-action", (event) => {
        const target = $(event.target);
        const dataId = target.data("id");
        const dataClass = target.attr("class");

        if (
          dataClass === "type-delete-btn border-0 rounded-circle btn-style-danger" ||
          dataClass === "far fa-trash-alt fa-sm"
        ) {
          Swal.fire({
            text: "Are you sure delete",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.value) {
              (this.getLoader = true),
                axios
                  .delete(
                    this.globalVariables.apiUrl+`admin/career/jobcareer/delete/${dataId}`,
                    {
                      headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                      },
                    }
                  )
                  .then((res) => {
                    toastr.success(res.data.message);
                    this.getJobCareers();
                  })
                  .catch((e) => {
                    return e;
                  })
                  .finally(() => {
                    this.getLoader = false;
                  });
            }
          });
        }
      });
    },

    ListenersOfCheckbox() {
      $("#job_careers_tables").on("click", ".status-change-btn", (event) => {
        const target = $(event.target);
        this.statusData.id = target.data("id");
        this.statusData.status = target.is(":checked") ? "1" : "2";
        this.getLoader = true;
        axios
          .post(this.globalVariables.apiUrl+`admin/career/status`, this.statusData, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((res) => {
            this.getJobCareers();
            toastr.success(res.data.message);
            return;
          })
          .catch((e) => {
            return e;
          })
          .finally(() => {
            this.getLoader = false;
          });
      });
    },

    attachEventListenersOfButton(){
      $("#job_careers_tables_wrapper").on("click", "button", (event) => {
        const target = $(event.target);
        const dataClass = target.attr("id");
        if (dataClass === "create") {
          this.$router.push("/admin-career-jobcareer-create");
        }else if(dataClass == 'all_filters'){
          this.showHiddenExternalFilter = !this.showHiddenExternalFilter;
        } 
      });
    },
  },
};
</script>
<style>
#job_careers_tables colgroup:nth-of-type(2) {
	display: none !important;
}
#job_careers_tables .dt-checkboxes-cell{
	padding: 0.7rem 0.5rem !important;
}
.company_image {
  width: 40px !important;
}
</style>



