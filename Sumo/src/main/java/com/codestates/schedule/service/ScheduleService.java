package com.codestates.schedule.service;

import com.codestates.auth.LoginUtils;
import com.codestates.exception.BusinessLogicException;
import com.codestates.exception.ExceptionCode;
import com.codestates.member.entity.Member;
import com.codestates.member.repository.MemberRepository;
import com.codestates.schedule.entity.Schedule;
import com.codestates.schedule.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;

    public ScheduleService(ScheduleRepository scheduleRepository, MemberRepository memberRepository) {
        this.scheduleRepository = scheduleRepository;
        this.memberRepository = memberRepository;
    }

    public Schedule createSchedule(Schedule schedule) {

        String email = LoginUtils.checkLogin();
        Member member = memberRepository.findByEmail(email).get();
        schedule.setMember(member);

        // 중복 날짜 확인 로직
        verifyExistsDate(schedule.getDate(), member.getMemberId());

        return scheduleRepository.save(schedule);
    }

    public Schedule updateSchedule(Schedule schedule) {

        Schedule findSchedule = findVerifiedSchedule(schedule.getScheduleId());

        // 작성자와 수정자가 일치하는지 확인하는 로직
        String emailFromToken = LoginUtils.checkLogin();
        String emailFromSchedule = findSchedule.getMember().getEmail();
        checkAccessibleUser(emailFromToken, emailFromSchedule);

        Optional.ofNullable(schedule.getImageAddress()).ifPresent(imageAddress -> findSchedule.setImageAddress(imageAddress));
        Optional.ofNullable(schedule.getMemo()).ifPresent(memo -> findSchedule.setMemo(memo));
        Optional.ofNullable(schedule.getLocation()).ifPresent(location -> findSchedule.setLocation(location));
        Optional.ofNullable(schedule.getStartTime()).ifPresent(startTime -> findSchedule.setStartTime(startTime));
        Optional.ofNullable(schedule.getEndTime()).ifPresent(endTime -> findSchedule.setEndTime(endTime));

        return scheduleRepository.save(findSchedule);
    }

    public Schedule findSchedule(long scheduleId) {
        return findVerifiedSchedule(scheduleId);
    }

    private Schedule findVerifiedSchedule(long scheduleId) {
        Optional<Schedule> optionalSchedule = scheduleRepository.findById(scheduleId);
        Schedule schedule =
                optionalSchedule.orElseThrow(() -> new BusinessLogicException(ExceptionCode.SCHEDULE_NOT_FOUND));

        String emailFromToken = LoginUtils.checkLogin();
        String emailFromSchedule = schedule.getMember().getEmail();
        checkAccessibleUser(emailFromToken, emailFromSchedule);

        return schedule;
    }

    public List<Schedule> findOneUserSchedules(int year, int month) {
        String emailFromToken = LoginUtils.checkLogin();
        Member member = memberRepository.findByEmail(emailFromToken).get();
        List<Schedule> schedules = scheduleRepository.findByMember_MemberId(member.getMemberId());

        if (schedules.size() == 0) {
            return schedules;
        }

        Schedule findSchedule = schedules.get(0);
        String emailFromSchedule = findSchedule.getMember().getEmail();
        checkAccessibleUser(emailFromToken, emailFromSchedule);

        return schedules.stream()
                .filter(schedule -> convertDateToYear(schedule.getDate()) == year
                        && convertDateToMonth(schedule.getDate()) == month)
                .collect(Collectors.toList());
    }

    public List<List<Schedule>> findAllUsersSchedules(int year, int month) {
        String emailFromToken = LoginUtils.checkLogin();
        if (!emailFromToken.equals("SoomoAdmin@gmail.com")) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_ACCESS_SCHEDULE);
        }

        List<Member> members = memberRepository.findAll();
        List<List<Schedule>> responses = new ArrayList<>();

        for (Member member : members) {
            List<Schedule> schedules = scheduleRepository.findByMember_MemberId(member.getMemberId());
            List<Schedule> filteredSchedules = schedules.stream()
                    .filter(schedule -> convertDateToYear(schedule.getDate()) == year
                            && convertDateToMonth(schedule.getDate()) == month)
                    .collect(Collectors.toList());
            responses.add(filteredSchedules);
        }

        return responses;
    }

    private int convertDateToYear(String date) {
        return Integer.parseInt(date.substring(0, 4));
    }

    private int convertDateToMonth(String date) {
        return Integer.parseInt(date.substring(5, 7));
    }

    public void deleteSchedule(long scheduleId) {
        Schedule schedule = findVerifiedSchedule(scheduleId);
        scheduleRepository.delete(schedule);
    }

    private void checkAccessibleUser(String emailFromToken, String emailFromCalendar) {
        if (!emailFromToken.equals("SoomoAdmin@gmail.com") && !emailFromToken.equals(emailFromCalendar)) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_ACCESS_SCHEDULE);
        }
    }

    private void verifyExistsDate(String date, long memberId) {
        Optional<Schedule> optionalSchedule = scheduleRepository.findByDateAndMember_MemberId(date, memberId);
        if (optionalSchedule.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.SCHEDULE_EXISTS);
        }
    }
}
