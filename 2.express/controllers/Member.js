import bcrypt from 'bcryptjs';
import MemberModel from '../models/Member.js';

class MemberController {
  getAllMember = () => {
    const members = MemberModel.find();

    members.then((data) => {
      if (!data.length) throw res.status(404).send('Not Found Members');

      const members = data.map((item) => {
        return {...item}
      });
      console.log(members);
    }).catch((err) => {})

  }
  createMember = async (req, res, next) => {
    if (req.method === 'GET') {
      res.render('member/register');
    } else if (req.method === 'POST') {
      await this.hashPassword(req)

      const result = await MemberModel.create(req.body);

      if (!result) throw new HttpException(500, 'Something went wrong');

      res.status(201).send('Member was created!');
    }
  }
  userLogin = (req, res, next) => {
    if (req.method === 'GET') {
      if(req.session.isLogined) {
        res.send('로그인 상태입니다.');
      } else {
        res.render('member/login');
      }
    } else if (req.method === 'POST') {
      const { mb_id, mb_password } = req.body;
      const member = MemberModel.findOne({ mb_id });
      member.then( async (data) => {
        if (!data.length) throw res.status(404).send('Not Found Member');
        
        const isMatch = await bcrypt.compare(mb_password, data[0].mb_password);

        if (!isMatch) throw res.status(404).send('Incorrect Password');
        
        req.session.regenerate(()=>{
          req.session.isLogined = true;
          req.session.mbId = mb_id;
          res.status(201).send('Login!');
        });
      }).catch((err) => {});
    }
    
  }
  userLogout = (req, res, next) => {
    if(req.session.isLogined) {
      req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/');
      });
    } else {
      res.redirect('/member/login');
    }
  }
  updateMember = (req, res, next) => {
    if(req.method === 'GET') {
      const member = MemberModel.findOne({mb_id: req.session.mbId});
      member.then((data) => {
        if (!data.length) throw res.status(404).send('Not Found Member');
  
        res.render('member/member_info',{data: data[0]});
      }).catch((err) => {});
    } else if (req.method === 'POST') {

    }
  }
  deleteMember = () => {
    const result = BoardModel.delete(req.params.bo_no);
    if (!result) throw res.status(500).send('Something went Wrong');

    res.status(201).send('Member was delete!');
  }
  hashPassword = async (req) => {
    if (req.body.mb_password) {
      req.body.mb_password = await bcrypt.hash(req.body.mb_password, 8);
    }
  }
}

export default new MemberController;