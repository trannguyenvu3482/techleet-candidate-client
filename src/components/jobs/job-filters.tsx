"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { api } from "@/lib/api";
import type { CompanyDepartment, CompanyHeadquarter } from "@/lib/api";

interface JobFiltersProps {
  filters: {
    search: string;
    employmentType: string;
    experienceLevel: string;
    departmentId: string;
    headquarterId: string;
    minSalary: string;
    maxSalary: string;
  };
  onFilterChange: (filters: Partial<JobFiltersProps['filters']>) => void;
  onClearFilters: () => void;
}

export function JobFilters({ filters, onFilterChange, onClearFilters }: JobFiltersProps) {
  const [departments, setDepartments] = useState<CompanyDepartment[]>([]);
  const [headquarters, setHeadquarters] = useState<CompanyHeadquarter[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    type: true,
    experience: true,
    location: true,
    department: true,
    salary: true,
  });

  // Employment types
  const employmentTypes = [
    { value: 'full-time', label: 'Toàn thời gian' },
    { value: 'part-time', label: 'Bán thời gian' },
    { value: 'contract', label: 'Hợp đồng' },
    { value: 'internship', label: 'Thực tập' },
  ];

  // Experience levels
  const experienceLevels = [
    { value: 'entry', label: 'Mới ra trường' },
    { value: 'mid', label: 'Trung cấp' },
    { value: 'senior', label: 'Cao cấp' },
    { value: 'lead', label: 'Trưởng nhóm' },
    { value: 'executive', label: 'Điều hành' },
  ];

  // Salary ranges
  const salaryRanges = [
    { min: '', max: '', label: 'Tất cả mức lương' },
    { min: '10000000', max: '20000000', label: '10 - 20 triệu' },
    { min: '20000000', max: '30000000', label: '20 - 30 triệu' },
    { min: '30000000', max: '50000000', label: '30 - 50 triệu' },
    { min: '50000000', max: '80000000', label: '50 - 80 triệu' },
    { min: '80000000', max: '', label: 'Trên 80 triệu' },
  ];

  // Load company data
  useEffect(() => {
    const loadCompanyData = async () => {
      try {
        const [deptData, hqData] = await Promise.all([
          api.getDepartments(),
          api.getHeadquarters(),
        ]);
        setDepartments(deptData.filter(dept => dept.isActive));
        setHeadquarters(hqData.filter(hq => hq.isActive));
      } catch (error) {
        console.error('Error loading company data:', error);
        // Don't show error to user, just log it
        // Filters will work without this data
      }
    };

    loadCompanyData();
  }, []);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSalaryRangeChange = (min: string, max: string) => {
    onFilterChange({ minSalary: min, maxSalary: max });
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== "").length;
  };

  const FilterSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string; 
    section: keyof typeof expandedSections; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 pb-4 mb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
      >
        {title}
        {expandedSections[section] ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      {expandedSections[section] && children}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Bộ lọc</h2>
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-blue-600 hover:text-blue-800"
          >
            <X className="h-4 w-4 mr-1" />
            Xóa tất cả ({getActiveFiltersCount()})
          </Button>
        )}
      </div>

      {/* Employment Type */}
      <FilterSection title="Loại hình công việc" section="type">
        <div className="space-y-2">
          {employmentTypes.map((type) => (
            <label key={type.value} className="flex items-center">
              <input
                type="radio"
                name="employmentType"
                value={type.value}
                checked={filters.employmentType === type.value}
                onChange={(e) => onFilterChange({ employmentType: e.target.value })}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{type.label}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="employmentType"
              value=""
              checked={filters.employmentType === ""}
              onChange={(e) => onFilterChange({ employmentType: e.target.value })}
              className="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Tất cả</span>
          </label>
        </div>
      </FilterSection>

      {/* Experience Level */}
      <FilterSection title="Cấp độ kinh nghiệm" section="experience">
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level.value} className="flex items-center">
              <input
                type="radio"
                name="experienceLevel"
                value={level.value}
                checked={filters.experienceLevel === level.value}
                onChange={(e) => onFilterChange({ experienceLevel: e.target.value })}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{level.label}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="experienceLevel"
              value=""
              checked={filters.experienceLevel === ""}
              onChange={(e) => onFilterChange({ experienceLevel: e.target.value })}
              className="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Tất cả</span>
          </label>
        </div>
      </FilterSection>

      {/* Location */}
      <FilterSection title="Địa điểm" section="location">
        <div className="space-y-2">
          {headquarters.map((hq) => (
            <label key={hq.headquarterId} className="flex items-center">
              <input
                type="radio"
                name="headquarterId"
                value={hq.headquarterId.toString()}
                checked={filters.headquarterId === hq.headquarterId.toString()}
                onChange={(e) => onFilterChange({ headquarterId: e.target.value })}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{hq.city}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="headquarterId"
              value=""
              checked={filters.headquarterId === ""}
              onChange={(e) => onFilterChange({ headquarterId: e.target.value })}
              className="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Tất cả địa điểm</span>
          </label>
        </div>
      </FilterSection>

      {/* Department */}
      <FilterSection title="Phòng ban" section="department">
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {departments.map((dept) => (
            <label key={dept.departmentId} className="flex items-center">
              <input
                type="radio"
                name="departmentId"
                value={dept.departmentId.toString()}
                checked={filters.departmentId === dept.departmentId.toString()}
                onChange={(e) => onFilterChange({ departmentId: e.target.value })}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{dept.departmentName}</span>
            </label>
          ))}
          <label className="flex items-center">
            <input
              type="radio"
              name="departmentId"
              value=""
              checked={filters.departmentId === ""}
              onChange={(e) => onFilterChange({ departmentId: e.target.value })}
              className="mr-2 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Tất cả phòng ban</span>
          </label>
        </div>
      </FilterSection>

      {/* Salary Range */}
      <FilterSection title="Mức lương" section="salary">
        <div className="space-y-3">
          {/* Predefined ranges */}
          <div className="space-y-2">
            {salaryRanges.map((range, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="salaryRange"
                  checked={filters.minSalary === range.min && filters.maxSalary === range.max}
                  onChange={() => handleSalaryRangeChange(range.min, range.max)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>

          {/* Custom range */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">Tùy chỉnh (VND)</p>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Từ"
                value={filters.minSalary}
                onChange={(e) => onFilterChange({ minSalary: e.target.value })}
                className="text-sm"
              />
              <Input
                type="number"
                placeholder="Đến"
                value={filters.maxSalary}
                onChange={(e) => onFilterChange({ maxSalary: e.target.value })}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </FilterSection>
    </div>
  );
}
