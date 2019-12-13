<template>
<div class = "background">
<center>
  <v-container id = "forms">
      <div id = "topics">
    <v-text-field id="table" v-model="searched" label="Search your topic" autocomplete="off" @keyup="searchTopic(searched)" placeholder="Input Topic" outlined>
        <button small>Search</button>
      </v-text-field> 
     <table id = "table">
    
       <tr v-for="(topic, index) in topics" :key="index">
         <td>
  <h5>{{topic.subject }}</h5>
         </td>
         <td style="padding : 10px">
      <div style="font-size: 12px">

      <span v-show="topic.isDeleted" >-Deleted </span>
      <span v-show="topic.isResolved">-Resolved </span>
      <span v-show="topic.isViewed && !topic.isResolved && !topic.isDeleted" >-viewed </span>
      <span v-show="topic.inProgress">-working on it </span>
      <span v-show="!topic.isViewed">-Unread </span>
</div>
         </td>
       </tr>
     </table>
  </div>
    <v-layout text-center wrap>
      <v-flex justify-center>
        <v-card  width="90%"  height= "100%" style ="margin-top:0%;" class="mx-auto">
          <v-form  ref="form" @submit.prevent="send">
             <p v-if="errors.length" class="errors">
               <b>Please correct the following error(s):</b>
                <ul v-for ="(error, i) in errors" :key="i">
                 <li>{{ error }}</li>
                </ul>
             </p> 
            <v-row class="mx-auto">
              <v-col class="d-flex" cols="12" sm="6">
                <v-select v-model="category" :items="items" filled label="Category" outlined></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field v-model="topic" label="Topic" autocomplete="off" @keyup="getSuggestions" placeholder="Input Topic" outlined></v-text-field>
              </v-col>
              
            </v-row>
            <h3>Insight on the Topic of Concern</h3>
            <v-row class="ml-3 mr-3">
              <v-textarea
                id="des"
                solo
                class="full-width"
                label="Problem"
                rows="6"
                v-model="problem"
              ></v-textarea>
            </v-row>
            <v-row class="ml-3 mr-3">
              <v-textarea
                id="des"
                solo
                class="full-width"
                label="Suggestion to solve the problem"
                rows="6"
                v-model="suggestion"
              ></v-textarea>
            </v-row>
            <p>Provide the Address of Concern</p>
            <hr class="ml-12 mr-12" />
            <v-row class="mx-auto">
              <v-col cols="12" sm="6" md="4">
                  
                <v-text-field v-model="city" label="City" autocomplete="true"  placeholder="City" filled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="municipality"
                  label="Municipality"
                  placeholder="Municipality"
                  autocomplete="true"
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="barangay"
                  label="Barangay"
                  autocomplete="true"

                  placeholder="Barangay"
                  filled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <h6 style="margin-left:5%">OPTIONAL</h6>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="contact"
                  label="Contact Information"
                  autocomplete="off"
                  placeholder="provide your contact information"
                  filled
                ></v-text-field>
              </v-col>
            </v-row>

            <div class="inputholder">
              Upload picture related to your topic.
            <input type="file" multiple ref="file" class="finput" @change="getImage($event)"> 
            </div>
            <div class="imh">
            <img :src="url" v-if="url" class="image">
            </div>
            <input class="mb-2 btnsb" color="primary" type="submit" value="Submit" style="background-color:gray; width:70px; height:40px; background-radius:20px" />
            
          </v-form>
       
        </v-card>
      </v-flex>
    </v-layout>
    <div class="suggestions">
                  <p class="sg tsg">Choose suggested topic that is same to yours to make it to be prioritized</p>
                  <p class="sg" v-for="(sug, i) in suggestions" :key="i" @click="topic = sug._id">{{sug._id}}</p>
              </div>
  </v-container>
</center>
</div>
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
export default {
  name: "HelloWorld",
  data: () => ({
    items: [
      {
        text: "Environmental"
      },
      {
        text: "Social"
      },
      {
        text: "Political"
      },
      {
        text: "Economical"
      },
      {
        text: "Services"
      },
      {
        text: "Facilities"
      },{
        text: "Cultural"
      }
    ],
    checkbox: true,
    radioGroup: 1,
    switch1: true,
    errors:[],
    category: "",
    topic: "",
    problem: "",
    city: "",
    municipality: "",
    barangay: "",
    image: "",
    url: null,
    suggestions: [],
    show:false,
    topicTobeSearched:'',
    searched:'',
     status:'',
     topics:[],
     suggestion:'',
     contact:''
      
  }),
  mounted(){
  
      axios.get("http://localhost:3002/post/retrieveAll")
      .then (res =>{
        this.topics = res.data
      console.log(this.topics)
      }).catch(err =>{
        console.log(err)
      })
    },
  methods: {
    checkForm: function() {
      this.errors = [];
      if (!this.category) this.errors.push("Category required.");
      if (!this.topic) this.errors.push("Topic required.");
      if (!this.problem) this.errors.push("Problem required.");
      if (!this.city) this.errors.push("city required.");
      if (!this.municipality) this.errors.push("municipality required.");
      if (!this.barangay) this.errors.push("barangay required.");
      // if(!this.contact)this.errors.push("cantact information is required.")
      if(!this.suggestion)this.errors.push("suggestion is required.")
      return this.errors.length;
    },
    send() {
      var result = this.checkForm();
      if (result == 0) {
        const fd = new FormData();
        fd.append("img", this.image);
        fd.append("category", this.category);
        fd.append("body", this.problem);
        fd.append("subject", this.topic);
        fd.append("city", this.city);
        fd.append("municipality", this.municipality);
        fd.append("barangay", this.barangay);
        fd.append("suggestions",this.suggestion);
        fd.append("contactInfo",this.contact)
        console.log(this.image)
        axios.post("http://localhost:3002/post/create",  fd, 
          { headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          swal({ title: "Message successfully send", icon: "sucess" });
          this.category = "";
          this.contact="";
          this.suggestion ="";
          this.topic ="";
          this.problem="";
          this.city ="";
          this.municipality ="";
          this.barangay ="";
          this.url = null;
          this.image=""
        }).catch(err => {
          alert("error");
        })
      }
    },
    getImage(event) {
      // var img = this.$refs.file.files[0];
      let img = event.target.files[0];
      this.url = URL.createObjectURL(img);
      this.image = img;
    },
    getSuggestions() {
      this.show = true;
      if (this.topic != "") {
      axios.get("http://localhost:3002/post/getSuggestions/"+this.topic)
        .then(res => {
          this.suggestions = res.data;
        }).catch(err => {
          alert("Unexpected error occured! Please try again later.")
        })
        }
    },  
    pickTopic(topic) {
      this.topic = topic;
    },
    searchTopic(topic){
      axios.post("http://localhost:3002/post/findTopic/"+ topic)
      .then(res =>{
          this.topics = res.data
        console.log(res.data)


      }).catch(err =>{
        console.log(err)
      })
if(this.searched == ''){
  axios.get("http://localhost:3002/post/retrieveAll")
      .then (res =>{
        this.topics = res.data
      console.log(this.topics)
      }).catch(err =>{
        console.log(err)
      })
}
    },
  
  }
};
</script>

<style>
#checkbox {
  margin-right: 10%;  
}

.errors {
  color: red;
}
ul {
  list-style: none;
}

.image {
  width:80%;
  display: inline-block;
  height: auto;
  box-sizing: border-box;
  margin:20px;
}

.im {
  text-align: center;
  box-sizing: border-box;
  padding:10px;
}

.finput {
  margin:10px;
}

.btnsb {
  margin:30px;
  
}
.background{
  height: 100vh;
  text-align: center;
  /* background-image: url("../assets/soc.jpg"); */
background-size: cover;
}

.suggestions {
  text-align: left;
  position: fixed;
  background:white;
  /* padding: 10px; */
  border: 1px solid lightgrey;
  border-radius: 3px;
  right: 5px;
  top:36px;
  z-index: 1;
  height: 604px;
  overflow: auto;
  width:210px;
  float: left;
  margin-right: 10%
}

.sg {
  padding: 5px 10px;
  font-size: 15px;
  margin:0 !important ;
  border-bottom: 1px solid rgb(245, 241, 241);
}
.tsg {
  background:lightgrey !important;
  font-size: 13px;

}
.sg:hover {
  background:rgb(236, 233, 233);
}
#topics{
  float: left;
  margin-right: 10%;
  text-align: center;
}
#forms{
  float: left;
  padding: 30px
}
#table{
  display: inline-block;
  text-align: center;
  height: 750px;
  width:300px;
  margin-left: 20%;

  overflow-y: scroll;
}
#table :hover{
  background:rgb(236, 233, 233);
}
</style>