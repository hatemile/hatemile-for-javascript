config = {
	"parameters": {
		"id-container-shortcuts": "container-shortcuts",
		"id-skip-link-container-shortcuts": "link-skip-shortcuts",
		"id-skip-container-shortcuts": "skip-shortcuts",
		"id-text-shortcuts": "text-shortcuts",
		
		"class-list-image-areas": "list-areas",
		"class-longdescription-link": "longdescription-link",
		
		"data-ignore": "ignorehatemile",
		"data-label-required-field": "labelrequiredfield",
		"data-accesskey": "accesskey",
		"data-list-for-image": "listforimage",
		"data-longdescription-for-image": "longdescriptionforimage",
		
		"text-skip-container-shortcuts": "Skip shortcuts",
		"text-no-shortcuts-alert": "No access keys have been defined for this page.",
		"text-shortcuts": "Shortcuts:",
		"text-standart-shortcut-prefix": "ALT",
		
		"prefix-required-field": "*",
		"prefix-generated-ids": "id-cs-",
		"prefix-longdescription-link": "",
		
		"suffix-longdescription-link": "[d]",
		"suffix-required-field": ""
	},
	"selector-changes": [
		//HTML5 Recommendations
		{"selector": "article:not([role])", "attribute": "role", "value-attribute": "article"},
		{"selector": "aside:not([role])", "attribute": "role", "value-attribute": "complementary"},
		{"selector": "datalist", "attribute": "role", "value-attribute": "listbox"},
		{"selector": "datalist", "attribute": "aria-multiselectable", "value-attribute": "false"},
		{"selector": "dialog:not([role])", "attribute": "role", "value-attribute": "dialog"},
		{"selector": "input[type=range]", "attribute": "role", "value-attribute": "slider"},
		{"selector": "input[type=number]", "attribute": "role", "value-attribute": "spinbutton"},
		{"selector": "main", "attribute": "role", "value-attribute": "main"},
		{"selector": "math", "attribute": "role", "value-attribute": "math"},
		{"selector": "menu", "attribute": "role", "value-attribute": "menu"},
		{"selector": "menu[type=toolbar]", "attribute": "role", "value-attribute": "toolbar"},
		{"selector": "menuitem", "attribute": "role", "value-attribute": "menuitem"},
		{"selector": "menu [type=checkbox]", "attribute": "role", "value-attribute": "menuitemcheckbox"},
		{"selector": "menu [type=radio]", "attribute": "role", "value-attribute": "menuitemradio"},
		{"selector": "nav", "attribute": "role", "value-attribute": "navigation"},
		{"selector": "output:not([role])", "attribute": "role", "value-attribute": "status"},
		{"selector": "output", "attribute": "aria-live", "value-attribute": "polite"},
		{"selector": "progress", "attribute": "role", "value-attribute": "progressbar"},
		{"selector": "summary", "attribute": "role", "value-attribute": "button"}
		//Bootstrap Recomendations
		/*
		{"selector": "li.dropdown", "attribute": "aria-haspopup", "value-attribute": "true"},
		{"selector": ".has-error input, .has-error select, .has-error textarea", "attribute": "aria-invalid", "value-attribute": "true"},
		{"selector": ".dropdown-menu li a", "attribute": "tabindex", "value-attribute": "-1"},
		{"selector": ".navbar", "attribute": "role", "value-attribute": "navigation"},
		{"selector": ".dropdown-menu li a", "attribute": "role", "value-attribute": "menuitem"},
		{"selector": ".progress-bar", "attribute": "role", "value-attribute": "progressbar"},
		{"selector": ".dropdown-menu", "attribute": "role", "value-attribute": "menubar"},
		{"selector": ".dropdown-menu li", "attribute": "role", "value-attribute": "presentation"},
		{"selector": ".alert", "attribute": "role", "value-attribute": "alert"}
		*/
	]
};