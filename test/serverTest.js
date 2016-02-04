// This test tests the application itself
var assert = require('assert');
var should = require('should');
var request = require('supertest');

// Basic test section
describe('Basic tests', function() {
    // Please change the URL when it is not 127.0.0.1:8080
    var URL = '127.0.0.1:8080';

    // Main tests (currently just for checking the site)
    describe('Main - Check if the site is available', function() {
        // First - check if the website is online:
        it('Should return error message, if the site is not online and nothing but a green hook when it is. Please make sure, that your site is online, and can be requested under 127.0.0.1:8080 - otherwise change the URL and Port inside this test', function (done) {
            request(URL)
                .get('/')
                // end handles the response
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    // Check if the status is "200" - for "OK"
                    res.status.should.be.equal(200);
                    done();
                });
        });
    });

    // Simple getter tests
    describe('Getter Tests - Check if we get valid values', function() {
        // Testing the "listStructure" function to check, if there is any valid content
        it('Testing the "listStructure" function to check, if there is any valid content', function(done) {
            request(URL)
                .get('/listStructure')
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // Check if the status is "200" - for "OK"
                    res.status.should.be.equal(200);

                    // Check if the responseBody is okay
                    res.body.should.have.property(0);

                    var firstElement = res.body[0];

                    firstElement.should.have.property("label");
                    firstElement.should.have.property("name");
                    firstElement.should.have.property("type");

                    done();
                });
        });

        // Testing the "listStructure" function to check, if there is any valid content
        it('Testing the "listContent" function to check, if there is any valid content (Just checking firstname and surname proprty!)', function(done) {
            request(URL)
                .get('/listContent')
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // Check if the status is "200" - for "OK"
                    res.status.should.be.equal(200);

                    // Check if the responseBody is okay
                    res.body.should.have.property(0);

                    // Get the first element
                    var firstElement = res.body[0];

                    firstElement.should.have.property("firstname");
                    firstElement.should.have.property("surname");

                    done();
                });
        });

        // Test if the head structure match with the content structure
        it('Test if the head structure match with the content structure', function(done) {
            request(URL)
                .get('/listStructure')
                // end handles the response
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    // Check if the status is "200" - for "OK"
                    res.status.should.be.equal(200);

                    // Set response body
                    var structureArray = [];
                    var currentStructureContent = [];

                    // Response iterate
                    for(var currentStructureHead in res.body) {
                        // Add name into structure
                        structureArray.push(res.body[currentStructureHead].name);
                    }

                    // Now get the table content
                    request(URL)
                        .get('/listContent')
                        // end handles the response
                        .end(function(err, resContent) {
                            if (err) {
                                throw err;
                            }

                            // Check if the status is "200" - for "OK"
                            resContent.status.should.be.equal(200);

                            // Check if the responseBody is okay
                            resContent.body.should.have.property(0);

                            // Iterate the returning content
                            for(var currentStructureContent in resContent.body) {
                                // Set the currentElement
                                var currentElement = resContent.body[currentStructureContent];

                                // Iterate the table header structure
                                structureArray.forEach(function(currentHeadProperty) {
                                    currentElement.should.have.property(currentHeadProperty);
                                });
                            }
                        });

                    done();
                });
        });
    });

    // Simple setter tests
    describe('Setter Tests - Check if we can set values - and if they mismatch from get response before', function() {
        // Modify the table structure
        it('Modify the table structure', function(done) {

            var originalStructure;
            var modifiedStructure = {"0": {"test":"TEST"}};

            // First of all - get the current structure
            request(URL)
                .get('/listStructure')
                // end handles the response
                .end(function(err, responseFromGetListStructure) {
                    if (err) {
                        throw err;
                    }
                    // Check if the status is "200" - for "OK"
                    responseFromGetListStructure.status.should.be.equal(200);

                    // Write this into the original structure
                    originalStructure = responseFromGetListStructure.body;
                });

            // Now, set the structure to something else
            request(URL)
                .post('/saveTableStructure')
                .send(modifiedStructure)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, responseSetter) {

                });

            // Check again the listStructure - the structure should have been changed
            request(URL)
                .get('/listStructure')
                // end handles the response
                .end(function(err, responseFromGetListStructureAfterChange) {
                    if (err) {
                        throw err;
                    }
                    // Check if the status is "200" - for "OK"
                    responseFromGetListStructureAfterChange.status.should.be.equal(200);

                    // Get the first element
                    var checkElement = responseFromGetListStructureAfterChange.body[0];

                    checkElement.should.have.property("test");
                });

            // And finally, rollback the structure to the original
            request(URL)
                .post('/saveTableStructure')
                .send(originalStructure)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, responseSetter) {

                });

            done();
        });

        // Modify the table value content
        it('Modify the table value content', function(done) {

            var originalStructure;
            var modifiedStructure = {"0": {"test":"TEST"}};

            // First of all - get the current structure
            request(URL)
                .get('/listContent')
                // end handles the response
                .end(function(err, responseFromGetListValueContent) {
                    if (err) {
                        throw err;
                    }
                    // Check if the status is "200" - for "OK"
                    responseFromGetListValueContent.status.should.be.equal(200);

                    // Write this into the original structure
                    originalStructure = responseFromGetListValueContent.body;
                });

            // Now, set the structure to something else
            request(URL)
                .post('/save')
                .send(modifiedStructure)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, responseSetter) {

                });

            // Check again the listStructure - the structure should have been changed
            request(URL)
                .get('/listContent')
                // end handles the response
                .end(function(err, responseFromGetListValueContentAfterChange) {
                    if (err) {
                        throw err;
                    }
                    // Check if the status is "200" - for "OK"
                    responseFromGetListValueContentAfterChange.status.should.be.equal(200);

                    // Get the first element
                    var checkElement = responseFromGetListValueContentAfterChange.body[0];

                    checkElement.should.have.property("test");
                });

            // And finally, rollback the structure to the original
            request(URL)
                .post('/save')
                .send(originalStructure)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, responseSetter) {

                });

            done();
        });
    });
});



