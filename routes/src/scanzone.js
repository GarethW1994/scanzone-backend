  const scanZone = function(req, res, next) {

    Model.user.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) return res.status(500).send('Error on the server.');
      if (!user) return res.status(404).send('No user found.');

      var passwordIsValid = bcrypt.compareSync(req.body.password,
        user.password);
      if (!passwordIsValid) return res.status(401).send({
        auth: false,
        token: null
      });

      var token = jwt.sign({
        id: user._id
      }, config.secret, {
        expiresIn: 1800 //expires in 1 hour
      })
      res.status(200).send({
        auth: true,
        token: token,
        role: user.role,
        username: req.body.username

      })
      req.headers.token = token;
      console.log(res.status(200))

    })
  }

  module.exports = scanZone;
