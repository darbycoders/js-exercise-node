export const auth = () => {
  return (req, res, next) => {
    try {
      if (!req.session.isLogined) res.redirect('/member/login');
      next();
    }catch (err) {
      next(err);
    }
  }
}