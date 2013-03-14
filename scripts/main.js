var harness;
var blockbrowser;
var validationbrowser;
var notify;
var savedialog;
var loaddialog;
var importexportmodeldialog;

require.config({
	paths: {
		'jquery': '//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
		'jqueryui' : '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.1/jquery-ui.min',
		'underscore': 'lib/underscore-min',
		'bootstrap': 'lib/bootstrap.min',
		'exception': 'harness',
		'stringlib': 'lib/stringlib',
		'domReady': 'lib/requirejs/domReady'
	},
	shim: {
		'jquery': {
			exports: '$'
      },

      'jqueryui': {
			deps: ['jquery'],
			exports: 'jqueryui'
      },

		'bootstrap': {
			deps: ['jquery']
		},

		'underscore': {
			exports: '_'
		}
	}
});

require(
[
	'jquery',
	'jqueryui',
	'domReady',
	'bootstrap',
	'harness/HarnessFactory',
	'harness/views/blockbrowser',
	'harness/views/validationbrowser',
	'harness/views/notify',
	'harness/engines/HarnessSerializer',
	'harness/views/savedialog',
	'harness/views/loaddialog',
	'harness/views/importexportmodeldialog'
],
function($, jqueryui, domReady, bootstrap, HarnessFactory, BlockBrowser, ValidationBrowser, Notify, HarnessSerializer, SaveDialog, LoadDialog, ImportExportModelDialog) {

	domReady(function() {
		var harnessFactory = new HarnessFactory();
		harness = harnessFactory.Build($("#harness"));
		blockbrowser = new BlockBrowser(harness);
		blockbrowser.CreateMarkup();
		blockbrowser.GetBlocks();

		validationbrowser = new ValidationBrowser(harness);
		validationbrowser.CreateMarkup();

		notify = new Notify();

		savedialog = new SaveDialog();
		savedialog.CreateMarkup();

		loaddialog = new LoadDialog();
		loaddialog.CreateMarkup();

		importexportmodeldialog = new ImportExportModelDialog();
		importexportmodeldialog.CreateMarkup();

		harness.ResizeCanvas();
	});
});
