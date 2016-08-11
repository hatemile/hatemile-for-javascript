config =
	"parameters":
		"text-shortcuts": "Shortcuts:",
		"text-standart-shortcut-prefix": "ALT",
		"text-autocomplete-value-both": "List or Inline",
		"text-autocomplete-value-list": "List",
		"text-autocomplete-value-inline": "Inline",
		"text-autocomplete-value-none": "None",
		"text-heading": "Summary:",
		
		"prefix-required-field": "*",
		"prefix-range-min-field": "",
		"prefix-range-max-field": "",
		"prefix-autocomplete-field": "",
		"prefix-generated-ids": "id-cs-",
		"prefix-longdescription": "",
		
		"suffix-longdescription": "[d]",
		"suffix-required-field": "",
		"suffix-range-min-field": "(Min: {{value}})",
		"suffix-range-max-field": "(Max: {{value}})",
		"suffix-autocomplete-field": "(Autocomplete: {{value}})"
	"skippers": [
		{"selector": "main,[role=main]", "default-text": "Main Content", "shortcut": "1"},
		{"selector": "nav,[role=navigation]", "default-text": "Menu", "shortcut": "2"},
		{"selector": "form", "default-text": "Form", "shortcut": "3"},
		{"selector": "#container-shortcuts", "default-text": "Shortcuts", "shortcut": "9"},
		{"selector": "#container-heading", "default-text": "Summary", "shortcut": "0"}
	],
	"selector-changes": [
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
	]