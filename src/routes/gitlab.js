var express = require('express'),
    router = express.Router();

var event_types = {
    merge_request: require('../lib/gitlab-events/merge-request')
}

router.use('/gitlab', function (request, response, next) {
    var body = request.body,
        slack = request.slack,
        type = body.object_kind;

    if (!event_types[type]) {
        return response.status(404).json('Not Found');
    }

    event_types[type](slack, body);
    response.json('Ok');
});

module.exports = router;
