"use strict";

const getCurrentUser = async () => {
	var promiseUser = await fetch("/user/current");
	currentUser = await promiseUser.json();
	document.getElementById('logged-in-username').value = currentUser.username;
	console.log(currentUser);
}

getCurrentUser();