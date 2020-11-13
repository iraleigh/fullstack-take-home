-- ***************** Clean Up *****************
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS sections;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS users;

-- *************** Create Tables ***************
CREATE TABLE users(
	id INT PRIMARY KEY NOT NULL,
	name CHAR(50) NOT NULL
);

CREATE TABLE courses (
	id INT PRIMARY KEY NOT NULL,
	name CHAR(50) NOT NULL,
	description TEXT
);

CREATE TABLE sessions (
	id INT PRIMARY KEY NOT NULL,
	courseId INT,
	number INT NOT NULL,
	name CHAR(100) NOT NULL,
	description TEXT,
	content TEXT,
	CONSTRAINT fkCourseId FOREIGN KEY(courseId) REFERENCES courses(id)
);

CREATE TABLE sections (
	id INT PRIMARY KEY NOT NULL,
	courseId INT,
	nickname CHAR(100) NOT NULL,
	startDate DATE NOT NULL,
	CONSTRAINT fkCourseId FOREIGN KEY(courseId) REFERENCES courses(id)
);

CREATE TABLE enrollment (
	id INT PRIMARY KEY NOT NULL,
	sectionId INT,
	userId INT,
	CONSTRAINT fksectionId FOREIGN KEY(sectionId) REFERENCES sections(id),
	CONSTRAINT fkuserId FOREIGN KEY(userId) REFERENCES users(id)
);

-- ********************* Create Course 1 ***************
INSERT INTO courses (id, name, description) VALUES (1, 'How To Write a Book', 'Ever wondered how you could write a book? Well now is your chance! Take this course to learn how to become the next Toni Morrison.');
-- ************** Create Course 1 Sessions *************
INSERT INTO sessions (
	id, 
	courseId,
	number, 
	name, 
	description, 
	content
) VALUES (
	1,
	1,
	1,
	'Decide on a topic',
	'Time to brainstorm on that idea you''ve been wanting to write about for ages. What will you say? Do you have enough to write about? Let''s find out!',
	''
);
INSERT INTO sessions (
	id, 
	courseId,
	number, 
	name, 
	description, 
	content
) VALUES (
	2,
	1,
	2,
	'Write your first chapter',
	'Now that you''ve decided what you''ll write about, it''s time to dive in and knock that first chapter out! They say that once you''ve jumped the first hurdle of writing the first chapter, the rest will come naturally!',
	''
);
INSERT INTO sessions (
	id, 
	courseId,
	number, 
	name, 
	description, 
	content
) VALUES (
	3,
	1,
	3,
	'Decide on a title',
	'Whether you want it to be clever, hard-hitting, or mysterious, the title of your book is the first thing people will see of your book. We''ll spend this lesson ideating on titles that make an impact.',
	''
);
INSERT INTO sessions (
	id, 
	courseId,
	number, 
	name, 
	description, 
	content
) VALUES (
	4,
	1,
	4,
	'Finding an Editor',
	'We''ll wrap up this course by setting you up for success and finding an editor to for you to continue to work with as your writing journey continues.',
	''
);
-- **************** Create Course 1 Sections ****************
INSERT INTO sections (
	id, 
	courseId,
	nickname, 
	startDate
) VALUES (
	1,
	1,
	'Section 1',
	'2020-10-30'
);
INSERT INTO sections (
	id, 
	courseId,
	nickname, 
	startDate
) VALUES (
	2,
	1,
	'Section 2',
	'2020-11-13'
);
INSERT INTO sections (
	id, 
	courseId,
	nickname, 
	startDate
) VALUES (
	3,
	1,
	'Section 3',
	'2020-11-27'
);


-- ******************* Create Course 2 ********************
INSERT INTO courses (id, name, description) VALUES (2, 'The Physics of Time', 'Time is just a construct - or is it? Take this course to dive deep into the space-time continuum.');
-- ******************* Create Course 2 Sessions ********************
INSERT INTO sessions (
	id, 
	courseId,
	number, 
	name, 
	description, 
	content
) VALUES (
	5,
	2,
	1,
	'What is Space-Time?',
	'Is it space? Is it time? Why are these 2 words now linked together? Let''s dive into the mystery!',
	''
);
INSERT INTO sessions (
	id, 
	courseId,
	number, 
	name, 
	description, 
	content
) VALUES (
	6,
	2,
	2,
	'What is a Light-Year?',
	'Have you ever wondered how we see stars so brightly, but can never visit them? We''ll introduce the concept of light-years and why objects in mirror are WAY farther than they appear.',
	''
);
INSERT INTO sessions (
	id, 
	courseId,
	number, 
	name, 
	description, 
	content
) VALUES (
	7,
	2,
	3,
	'Wormholes - not the ones in your garden',
	'Are there other universes out there? Are they using the same time we are? What is their construct of time? How do wormholes play into this?',
	''
);
INSERT INTO sessions (
	id, 
	courseId,
	number, 
	name, 
	description, 
	content
) VALUES (
	8,
	2,
	4,
	'Stargazing!',
	'We''ll wrap up this course by going on a stargazing adventure and talking about the expansion of space. Where is space expanding to? Exactly.',
	''
);
-- ************** Create Course 2 Sections ******************
INSERT INTO sections (
	id, 
	courseId,
	nickname, 
	startDate
) VALUES (
	4,
	2,
	'Section 1',
	'2020-10-15'
);
INSERT INTO sections (
	id, 
	courseId,
	nickname, 
	startDate
) VALUES (
	5,
	2,
	'Section 2',
	'2020-10-29'
);
INSERT INTO sections (
	id, 
	courseId,
	nickname, 
	startDate
) VALUES (
	6,
	2,
	'Section 3',
	'2020-11-12'
);

-- ************* Create Users *****************
INSERT INTO users(id, name) VALUES (1, 'iain');
INSERT INTO users(id, name) VALUES (2, 'sarah');
INSERT INTO users(id, name) VALUES (3, 'liz');
INSERT INTO users(id, name) VALUES (4, 'ryan');
INSERT INTO users(id, name) VALUES (5, 'val');

-- ************* Enrollment ******************
INSERT INTO enrollment(id, sectionId, userId) VALUES (1, 1, 2);
INSERT INTO enrollment(id, sectionId, userId) VALUES (2, 2, 3);
INSERT INTO enrollment(id, sectionId, userId) VALUES (3, 3, 4);
INSERT INTO enrollment(id, sectionId, userId) VALUES (4, 4, 5);





