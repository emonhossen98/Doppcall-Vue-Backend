<template>
  <div v-if="getLoader">
    <Loader></Loader>
  </div>
  <div class="gm-shortcode-form">
    <form @submit.prevent="submitForm" id="shortcode-multi-form">
      <input type="hidden" v-model="formData.page_url"  id="page_url" value="pageUrl" class="form-control"/>
      <div v-for="(tab, index) in tabs" :key="index" :class="{ tab: true, current: currentTab === index,  show: currentTab === index, active: currentTab === index, }">
        <div v-if="index === 0" class="mb-3">
          <input v-model="formData.company_name" type="text" id="company-name" required class="form-control" placeholder="Company Name" />
          <div id="company_name"></div>
        </div>
        <div v-if="index === 0" class="mb-3">
          <input v-model="formData.first_name" type="text" id="fname" required class="form-control" placeholder="First Name"/>
          <div id="first_name"></div>
        </div>
        <div v-if="index === 0" class="mb-3">
          <input v-model="formData.last_name"  type="text" id="lname" required class="form-control" placeholder="Last Name"/>
          <div id="last_name"></div>
        </div>
        <div v-if="index === 0" class="mb-3">
          <input v-model="formData.email" type="email" id="email" class="form-control" required placeholder="E-mail"/>
          <div id="emails"></div>
        </div>
        <div v-if="index === 1" class="mb-3">
          <input v-model="formData.phone" type="tel" id="phone" class="form-control" placeholder="Phone"  required />
          <div id="phones"></div>
        </div>
        <div v-if="index === 1" class="mb-3">
          <input v-model="formData.website"  type="text" id="website" class="form-control" placeholder="Website"/>
          <div id="websites"></div>
        </div>
        <div v-if="index === 1" class="mb-3">
          <select v-model="formData.country" required id="country" class="form-control">
            <option value="">Select Country</option>
            <option value="Afganistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antigua & Barbuda">Antigua & Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bonaire">Bonaire</option>
            <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Canary Islands">Canary Islands</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Channel Islands">Channel Islands</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos Island">Cocos Island</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo">Congo</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Cote DIvoire">Cote DIvoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaco">Curacao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="East Timor">East Timor</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Ter">French Southern Ter</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Great Britain">Great Britain</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong">Hong Kong</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="Indonesia">Indonesia</option>
            <option value="India">India</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Korea North">Korea North</option>
            <option value="Korea Sout">Korea South</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macau">Macau</option>
            <option value="Macedonia">Macedonia</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Malawi">Malawi</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Midway Islands">Midway Islands</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Nambia">Nambia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherland Antilles">Netherland Antilles</option>
            <option value="Netherlands">Netherlands (Holland, Europe)</option>
            <option value="Nevis">Nevis</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau Island">Palau Island</option>
            <option value="Palestine">Palestine</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Phillipines">Philippines</option>
            <option value="Pitcairn Island">Pitcairn Island</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Republic of Montenegro">Republic of Montenegro</option>
            <option value="Republic of Serbia">Republic of Serbia</option>
            <option value="Reunion">Reunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="St Barthelemy">St Barthelemy</option>
            <option value="St Eustatius">St Eustatius</option>
            <option value="St Helena">St Helena</option>
            <option value="St Kitts-Nevis">St Kitts-Nevis</option>
            <option value="St Lucia">St Lucia</option>
            <option value="St Maarten">St Maarten</option>
            <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
            <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
            <option value="Saipan">Saipan</option>
            <option value="Samoa">Samoa</option>
            <option value="Samoa American">Samoa American</option>
            <option value="San Marino">San Marino</option>
            <option value="Sao Tome & Principe">Sao Tome & Principe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Swaziland">Swaziland</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Tahiti">Tahiti</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad & Tobago">Trinidad & Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks & Caicos Is">Turks & Caicos Is</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="Uganda">Uganda</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Erimates">United Arab Emirates</option>
            <option value="United States of America">United States of America</option>
            <option value="Uraguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City State">Vatican City State</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
            <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
            <option value="Wake Island">Wake Island</option>
            <option value="Wallis & Futana Is">Wallis & Futana Is</option>
            <option value="Yemen">Yemen</option>
            <option value="Zaire">Zaire</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
          <div id="countrys"></div>
        </div>
        <div v-if="index === 2" class="mb-3">
          <select v-model="formData.buy_call" required id="buy-call" class="form-control">
            <option value="">Select Call</option>
            <option value="Yes, I am looking to buy calls">
              Yes, I am looking to buy calls
            </option>
            <option value="No, I am looking to sell calls">
              No, I am looking to sell calls
            </option>
          </select>
          <div id="buy_call"></div>
        </div>
        <div v-if="index === 2" class="mb-3">
          <textarea v-model="formData.vertical_calls"  rows="4" id="vertical-calls" class="form-control" placeholder="What vertical calls do you need?"
          ></textarea>
          <div id="vertical_calls"></div>
        </div>
        <div v-if="index === 2" class="mb-3">
          <textarea v-model="formData.get_calls"  rows="4" id="get-calls" class="form-control" placeholder="From Which State/Country you want to get calls?"
          ></textarea>
          <div id="get_calls"></div>
        </div>
        <div v-if="index === 2" class="mb-3">
          <div class="form-check">
            <input v-model="formData.company_term_condition" class="form-check-input" type="checkbox" id="term-condition"
            />
            <label class="form-check-label" for="term-condition">
              I agree to DOPPCALL terms and privacy policy.
            </label>
            <div id="company_term_condition"></div>
          </div>
        </div>
      </div>
      <div style="overflow: auto">
        <div style="float: right; margin-top: 5px">
          <button v-if="currentTab > 0" type="button" class="previous border-0 me-2" @click="previousTab">
            Previous
          </button>
          <button v-if="currentTab < tabs.length - 1" type="button" class="next btn-primary border-0 shadow-none" @click="nextTab">
            Next
          </button>
          <button v-if="currentTab === tabs.length - 1" type="submit" class="submit btn-primary border-0 shadow-none" >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import toastr from "toastr";
import Swal from "sweetalert2";
import "toastr/build/toastr.min.css";
import Loader from '../../../../include/loder.vue';
import { inject } from "vue";

export default {
  setup() {
    const globalVariables = inject("globalVariables");
    return { globalVariables };
  },
  components: {
    Loader,
  },
  data() {
    return {
      currentTab: 0,
      formData: {
        company_name: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        website: "",
        country: "",
        buy_call: "",
        vertical_calls: "",
        get_calls: "",
        company_term_condition: false,
      },
      tabs: [1, 2, 3],
      pageUrl: "",
      getLoader : false,
    };
  },
  methods: {
    previousTab() {
      this.currentTab--;
    },
    nextTab() {
      if(this.currentTab === 0){
        document.querySelector('#company_name').innerHTML = '';
        document.querySelector('#first_name').innerHTML = '';
        document.querySelector('#last_name').innerHTML = '';
        document.querySelector('#emails').innerHTML = '';
        if(this.formData.company_name == null || this.formData.company_name == ''){
          document.querySelector('#company_name').innerHTML = '<p class="text-danger">This company name is required</p>'; 
        }if(this.formData.first_name == null || this.formData.first_name == ''){
          document.querySelector('#first_name').innerHTML = '<p class="text-danger">This first name is required</p>';
        }if(this.formData.last_name == null || this.formData.last_name == ''){
          document.querySelector('#last_name').innerHTML = '<p class="text-danger">This last name is required</p>';
        }if(this.formData.email == null || this.formData.email == ''){
          document.querySelector('#emails').innerHTML = '<p class="text-danger">This email is required</p>';
        }else{
          this.currentTab++;
        }
      }else if(this.currentTab === 1){
        document.querySelector('#phones').innerHTML = '';
        document.querySelector('#websites').innerHTML = '';
        document.querySelector('#countrys').innerHTML = '';
        if(this.formData.phone == null || this.formData.phone == ''){
          document.querySelector('#phones').innerHTML = '<p class="text-danger">This phone is required</p>';
        }if(this.formData.website == null || this.formData.website == ''){
          document.querySelector('#websites').innerHTML = '<p class="text-danger">This website is required</p>';
        }if(this.formData.country == null || this.formData.country == ''){
          document.querySelector('#countrys').innerHTML = '<p class="text-danger">This country is required</p>';
        }else{
          this.currentTab++;
        }
      }
    },
    submitForm() {
      if(this.currentTab === 2){
        document.querySelector('#buy_call').innerHTML = '';
        document.querySelector('#vertical_calls').innerHTML = '';
        document.querySelector('#get_calls').innerHTML = '';
        document.querySelector('#company_term_condition').innerHTML = '';
        if(this.formData.buy_call == null || this.formData.buy_call == ''){
          document.querySelector('#buy_call').innerHTML = '<p class="text-danger">This buy call is required</p>';
        }if(this.formData.vertical_calls == null || this.formData.vertical_calls == ''){
          document.querySelector('#vertical_calls').innerHTML = '<p class="text-danger">This vertica calls is required</p>';
        }if(this.formData.get_calls == null || this.formData.get_calls == ''){
          document.querySelector('#get_calls').innerHTML = '<p class="text-danger">This get calls is required</p>';
        }if(this.formData.company_term_condition == false){
          document.querySelector('#company_term_condition').innerHTML = '<p class="text-danger">This company term condition is required</p>';
        }else{
          this.getLoader = true;
          axios
              .post(this.globalVariables.apiUrl+"shortcode/form/store", this.formData, {
                  headers: { 
                      Authorization: "Bearer " + localStorage.getItem("token"),
                  },
              })
              .then((res) => {
                  if(res.data.status == 'success'){
                    toastr.success(res.data.message);
                    window.location.href = '/frontend/meeting-form-link';
                    localStorage.removeItem('meetingInfo');
                    localStorage.setItem('meetingInfo',res.data && res.data.meetingInfoJSON);
                  } else {
                      toastr.error(res.data.message);
                  }
              })
              .catch((error) => {
                  console.error(error);
                  toastr.error('An error occurred while submitting the form.');
              })
              .finally(() => {
                  this.getLoader = false;
              });
          }
        }
    },
    },
  };
</script>
<style>
.gm-shortcode-form .btn-primary {
	background: #fff !important;
	color: #012964 !important;
	font-weight: bold !important;
	border-radius: 3px !important;
}
</style>