<template>
  <div id="app">
    <b-container fluid>
      <h2>Bob Division</h2>
      <b-table striped hover

        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="bob"
        :fields="fields">
        <template slot="_record" slot-scope="data">
          {{data.item.record.overallWins}} - {{data.item.record.overallLosses}}
        </template>
        <template slot="pointsFor" slot-scope="data">
          {{data.item.record.pointsFor}}
        </template>
        <template slot="pointsAgainst" slot-scope="data">
          {{data.item.record.pointsAgainst}}
        </template>
        <template slot="name" slot-scope="data">
          {{data.item.owners.firstName}} {{data.item.owners.lastName}}
        </template>
      </b-table>
      <h2>Dot Division</h2>
      <b-table striped hover
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :items="dot"
        :fields="fields">
        <template slot="_record" slot-scope="data">
          {{data.item.record.overallWins}} - {{data.item.record.overallLosses}}
        </template>
        <template slot="pointsFor" slot-scope="data">
          {{data.item.record.pointsFor}}
        </template>
        <template slot="pointsAgainst" slot-scope="data">
          {{data.item.record.pointsAgainst}}
        </template>
        <template slot="name" slot-scope="data">
          {{data.item.owners.firstName}} {{data.item.owners.lastName}}
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'app',
  data () {
    return {
      sortBy: 'overallStanding',
      sortDesc: false,
      fields: [
        {
          key: 'overallStanding',
          label: 'Standing',
        },
        {
          key: 'teamName',
          label: 'Name'
        },
        {
          key: 'name',
          label: 'Owner'
        },
        {
          key: '_record',
          label: 'Record'
        },
        {
          key: 'pointsFor',
          label: 'Points For'
        },
        {
          key: 'pointsAgainst',
          label: 'Points Against'
        }
      ],
      standings: [],
      dot: [],
      bob: [],
    }
  },
  created() {
    axios.get(`http://schumacher.football/api/standings/`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.standings = response.data;
      this.dot = this.transformData(this.standings.dot);
      this.bob = this.transformData(this.standings.bob);
    })
  },

  methods: {
    transformData(data) {
      for (var element in data){
        //data[element]._rowVariant	 = data[element].overallStanding <= 8 ? 'success' : 'danger';
        data[element]._cellVariants = data[element].overallStanding <= 4 ? { overallStanding: 'success' } : { overallStanding: 'danger' };
      };
      return data;
    }
  }

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
