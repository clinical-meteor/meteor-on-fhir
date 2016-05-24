// Gagarin Verification 

describe("clinical:active-layout", function(){

  it("it should specify a northFence for templates", function(){
    client
      .setWidth(1024, 768)
      .execute(function(){
        expect(Session.get('northFence')).to.equal(200);
      });
  });
  it("it should specify a southFence for templates", function(){
    client
      .setWidth(1024, 768)
      .execute(function(){
        expect(Session.get('southFence')).to.equal(200);
      });
  });
  it("it should specify an eastFence for templates", function(){
    client
      .setWidth(1024, 768)
      .execute(function(){
        expect(Session.get('eastFence')).to.equal(200);
      });
  });
  it("it should specify a westFence for templates", function(){
    client
      .setWidth(1024, 768)
      .execute(function(){
        expect(Session.get('westFence')).to.equal(200);
      });
  });

  it("it should display in fullscreen mode", function(){
    client
      .setWidth(1024, 768)
      .execute(function(){
        Session.set("isFullscreen", true);
        Session.set("fullscreenNavbars", true);
      }).then(function(){
        client.wait(500, "", function(){
          expect.element("navbarHeader").to.have.css("left",0);
          expect.element("navbarHeader").to.have.css("width",1024);
          expect(Session.get('eastFence')).to.equal(0);
          expect(Session.get('westFence')).to.equal(0);
        });
      });
  });
  it("it should display in page mode", function(){
    client
      .setWidth(1024, 768)
      .execute(function(){
        Session.set("isFullscreen", false);
        Session.set("fullscreenNavbars", true);
      }).then(function(){
        client.wait(500, "", function(){
          expect.element("navbarHeader").to.have.css("left",0);
          expect.element("navbarHeader").to.have.css("width",0);
          expect(Session.get('eastFence')).to.equal(300);
          expect(Session.get('westFence')).to.equal(300);
        });
      });
  });
  
  it("it should hide/show sidebar", function(){
    client
      .setWidth(1024, 768)
      .execute(function(){
        Session.set("isSidebarVisible", false);
        expect.element("sidebar").to.have.css("left",-300);
        Session.set("isSidebarVisible", true);
      }).then(function(){
        client.wait(500, "", function(){
          expect.element("sidebar").to.have.css("left",0);
        });
      });
  });
  
  //it("it should display in sidebar mode", function(){
  //});
  //it("it should display in fence mode", function(){
  //});
});