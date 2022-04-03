--
-- Table structure for table `board`
--

CREATE TABLE `board` (
  `bo_no` varchar(20) NOT NULL DEFAULT '',
  `bo_subject` varchar(255) NOT NULL DEFAULT '',
  `bo_insert_content` text NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`bo_no`),
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;`

