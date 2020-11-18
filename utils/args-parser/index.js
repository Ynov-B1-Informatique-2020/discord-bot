function Parse (argv) {
	// Returned object
	var args = {};
	
	var argName, argValue;

	// For each argument
	argv.forEach(function (arg, index) {
		// Seperate argument, for a key/value return
		arg = arg.split('=');

		// Retrieve the argument name
		argName = arg[0];
		
		// Associate defined value or set it to "true" (boolean)
    if (arg.length == 2) {
      argValue = arg[1]
    } else {
      argValue = true
    }

		// Push the argument in args
		args[argName] = argValue;
	});

	return args;
}

module.exports = Parse;