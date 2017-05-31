define([

],function(

){

  var store = (function(){

  	var api = {};

    var storage;

    var doc = document;

  	function serialize(value) {
  		return JSON.stringify(value);
  	}

  	function deserialize(value) {

  		if (typeof value != 'string') return undefined;

  		return JSON.parse(value);
  	}

  	if (localStorage in window && window.localStorage) {

  		storage = window.localStorage;

  		api.set = function(key, val) {
        storage[key] = serialize(val);
      }
  		api.get = function(key) {
        return deserialize(
          storage[key]);
      }
  		api.remove = function(key) {
        delete storage[key];
       }
  		api.clear = function() {
         storage.clear();
       }

  	} else {

      api.set = function(key, val) {

        if (window.name) {

          storage = deserialize(window.name);

        } else {

          storage = {};

        }

        storage[key] = val;

        window.name = serialize(storage);

      }
      api.get = function(key) {

        return deserialize(window.name)[key];

      }
      api.remove = function(key) {

        storage = deserialize(window.name);

        delete storage[key];

        window.name = serialize(storage);

       }
      api.clear = function() {

        window.name = '';

      }
    }
  	return api
  })()
  return store;
})
