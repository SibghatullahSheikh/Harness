function PSOMD3EventHandler(mypsom, myd3force) {
	this.PSOM = mypsom;
	this.D3Force = myd3force;
	this.D3ForceNodes = myd3force.nodes();
	this.D3ForceLinks = myd3force.links();

	this.AttachEventsToPSOM();
}

PSOMD3EventHandler.prototype.LongestLinkLength = 200;
PSOMD3EventHandler.prototype.PSOM = null;
PSOMD3EventHandler.prototype.D3Force = null;
PSOMD3EventHandler.prototype.D3ForceNodes = null;
PSOMD3EventHandler.prototype.D3ForceLinks = null;

PSOMD3EventHandler.prototype.AttachEventsToPSOM = function()
{
	this.PSOM.on("AddNeuron", this, function(caller, eneuron) {
		eneuron.D3Node = new D3Node();
		caller.D3ForceNodes.push(eneuron.D3Node);
	});

	this.PSOM.on("AddLink", this, function(caller, elink) {
		elink.D3Link = new D3Link(elink.from.D3Node, elink.to.D3Node, elink.value);
		console.log(elink);
		caller.D3ForceLinks.push(elink.D3Link);
	});

	this.PSOM.on("RemoveLink", this, function(caller, elink) {
		RemoveFromArray(caller.D3ForceLinks, elink.D3Link);
	});

	this.PSOM.on("RemoveNode", this, function(caller, elink) {
		RemoveFromArray(caller.D3ForceNodes, elink.D3Node);
	});

	this.PSOM.on("AlgorithmIterationComplete", this, function(caller, context) {
		for (var i = 0; i < context.links.length; i++) {
			context.links[i].D3Link.SetLength(context.links[i].value);
		};
	});
};

function D3Node() {}
D3Node.prototype.x = null;
D3Node.prototype.y = null;

function D3Link(mysource, mytarget, myweight) {
	this.source = mysource;
	this.target = mytarget;
	this.SetLength(myweight)
}
D3Link.prototype.LongestLinkLength = 100;
D3Link.prototype.SetLength = function (newLength)
{
	this.value = newLength * this.LongestLinkLength;
	return this.value;
};